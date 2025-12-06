import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import { findNearest, moveTowards, attack, inRange } from "../utils/simulationEngine";

export default function BattlePage() {
  const navigate = useNavigate();

  const gridSize = useGameStore((s) => s.gridSize);
  const unitDefs = useGameStore((s) => s.unitDefs);
  const playerUnits = useGameStore((s) => s.player.units);
  const botUnits = useGameStore((s) => s.bot.units);
  const saveResult = useGameStore((s) => s.saveResult);

  // ⭐ SPEED SLIDER
  const [speed, setSpeed] = useState(1200);

  const [units, setUnits] = useState([]);
  const running = useRef(false);
  const tickRef = useRef(null);

  const cell = 48;
  const boardPx = gridSize * cell;

  // -----------------------
  // INITIAL LOAD
  // -----------------------
  useEffect(() => {
    const init = [
      ...playerUnits.map((u) => ({
        ...u,
        team: "player",
        hp: u.hp ?? unitDefs[u.type].hp,
        stats: u.stats ?? { damage: 0, moves: 0 }
      })),

      ...botUnits.map((u) => ({
        ...u,
        team: "bot",
        hp: u.hp ?? unitDefs[u.type].hp,
        stats: u.stats ?? { damage: 0, moves: 0 }
      }))
    ];

    setUnits(init);

    if (!running.current) {
      running.current = true;
      startSimulation();
    }

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  // -----------------------
  // SPEED CHANGE RESTARTS INTERVAL
  // -----------------------
  useEffect(() => {
    if (running.current) {
      clearInterval(tickRef.current);
      tickRef.current = setInterval(() => {
        setUnits((prev) => simulateStep(prev));
      }, speed);
    }
  }, [speed]);

  // -----------------------
  // SIMULATION LOOP
  // -----------------------
  function startSimulation() {
    tickRef.current = setInterval(() => {
      setUnits((prev) => simulateStep(prev));
    }, speed);
  }

  function simulateStep(prev) {
    let cur = prev.map((u) => ({ ...u }));
    const aliveP = cur.filter((u) => u.team === "player" && u.hp > 0);
    const aliveB = cur.filter((u) => u.team === "bot" && u.hp > 0);

    // END GAME CHECK
    if (aliveP.length === 0 || aliveB.length === 0) {
      clearInterval(tickRef.current);
      running.current = false;

      const winner =
        aliveP.length > 0
          ? "Player"
          : aliveB.length > 0
          ? "Bot"
          : "Draw";

      saveResult({
        winner,
        units: cur.map((u) => ({
          id: u.id,
          type: u.type,
          side: u.team,
          hp: Math.max(0, u.hp),
          stats: u.stats || { damage: 0, moves: 0 },
        })),
      });

      setTimeout(() => navigate("/results"), 500);
      return cur;
    }

    const snapshot = cur.map((u) => ({ ...u }));

    // MOVEMENT PHASE
    for (let u of cur) {
      if (u.hp <= 0) continue;

      const enemies = snapshot.filter((e) => e.team !== u.team && e.hp > 0);
      if (!enemies.length) continue;

      const nearest = findNearest(u, enemies);

      if (!inRange(u, nearest, unitDefs)) {
        moveTowards(u, nearest, gridSize, cur);
        u.stats.moves++;
      }
    }

    // ATTACK PHASE
    const afterMove = cur.map((u) => ({ ...u }));

    for (let u of cur) {
      if (u.hp <= 0) continue;

      const enemies = afterMove.filter((e) => e.team !== u.team && e.hp > 0);
      if (!enemies.length) continue;

      const nearest = findNearest(u, enemies);

      if (inRange(u, nearest, unitDefs)) {
        const realTarget = cur.find((x) => x.id === nearest.id);
        if (realTarget) {
          attack(u, realTarget, unitDefs);
          u.stats.damage += unitDefs[u.type].atk;
        }
      }
    }

    return cur.map((u) => ({ ...u }));
  }

  // -----------------------
  // HUD LIVE VALUES
  // -----------------------
  const totalMoves = units.reduce((sum, u) => sum + (u.stats?.moves || 0), 0);
  const totalDamage = units.reduce((sum, u) => sum + (u.stats?.damage || 0), 0);
  const alivePlayer = units.filter((u) => u.team === "player" && u.hp > 0).length;
  const aliveBot = units.filter((u) => u.team === "bot" && u.hp > 0).length;

  return (
    <div className="min-h-[72vh] flex flex-col gap-4">

      {/* ⭐ SPEED SLIDER */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-yellow-300 font-semibold text-sm">Speed:</span>

        <input
          type="range"
          min="200"
          max="1600"
          step="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-48"
        />

        <span className="text-gray-300 text-sm">{speed} ms</span>
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-yellow-300">Battlefield • Holographic Grid</h2>

        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div>Player units: <span className="text-blue-400">{alivePlayer}</span></div>
          <div>Enemy units: <span className="text-red-400">{aliveBot}</span></div>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="flex gap-6">

        {/* ⭐ LEFT HUD */}
        <aside className="w-64 bg-black/70 border border-yellow-600/8 rounded-lg p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-yellow-300">Battle HUD</h3>

          <div className="mt-3 text-xs text-gray-300/70 space-y-2">
            <div><strong>Grid:</strong> {gridSize}×{gridSize}</div>
            <div><strong>Total Moves:</strong> {totalMoves}</div>
            <div><strong>Total Damage:</strong> {totalDamage}</div>
            <div><strong>Alive Player:</strong> {alivePlayer}</div>
            <div><strong>Alive Bot:</strong> {aliveBot}</div>
          </div>
        </aside>

        {/* ⭐ GRID */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className="relative bg-black/80 rounded-lg border border-yellow-600/8"
            style={{ width: boardPx, height: boardPx }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, ${cell}px)`,
                gridTemplateRows: `repeat(${gridSize}, ${cell}px)`,
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                const x = i % gridSize;
                const isLeft = x <= Math.floor((gridSize - 1) / 2);
                const borderColor = isLeft ? "rgba(59,130,246,0.2)" : "rgba(239,68,68,0.2)";
                const glowColor = isLeft ? "rgba(59,130,246,0.1)" : "rgba(239,68,68,0.1)";

                return (
                  <div
                    key={i}
                    className="w-[48px] h-[48px]"
                    style={{
                      border: `1px solid ${borderColor}`,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.75), rgba(10,10,10,0.6))",
                      boxShadow: `inset 0 0 18px ${glowColor}`,
                    }}
                  />
                );
              })}
            </div>

            {/* ⭐ UNITS */}
            <div className="absolute inset-0 pointer-events-none">
              {units.map((u) => {
                if (u.hp <= 0) return null;

                const left = u.x * cell;
                const top = u.y * cell;

                const borderColor = u.team === "player" ? "#3b82f6" : "#ef4444";
                const glow = u.team === "player"
                  ? "0 0 10px rgba(59,130,246,0.7)"
                  : "0 0 10px rgba(239,68,68,0.7)";

                return (
                  <div
                    key={u.id}
                    className="absolute rounded-sm flex flex-col items-center justify-center"
                    style={{
                      left,
                      top,
                      width: cell - 6,
                      height: cell - 6,
                      margin: 3,
                      border: `2px solid ${borderColor}`,
                      boxShadow: glow,
                      background: "rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Player Image */}
                    {u.team === "player" && (
                      <img
                        src={`/rangers/${u.type}.png`}
                        alt={u.type}
                        className="w-7 h-7 object-contain drop-shadow-md"
                      />
                    )}

                    {/* Bot Symbol */}
                    {u.team === "bot" && (
                      <div className="text-sm font-bold text-white">
                        {unitDefs[u.type]?.symbol ?? u.type[0].toUpperCase()}
                      </div>
                    )}

                    {/* HP BAR */}
                    <div className="mt-1 w-[70%] h-2 bg-black/60 rounded-full overflow-hidden border border-black/20">
                      <div
                        style={{
                          width: `${Math.max(0, (u.hp / unitDefs[u.type].hp) * 100)}%`,
                        }}
                        className={`h-full ${
                          u.hp / unitDefs[u.type].hp > 0.4
                            ? "bg-green-400"
                            : "bg-orange-400"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ⭐ RIGHT SIDE LOG */}
        <aside className="w-72 bg-black/70 border border-yellow-600/8 rounded-lg p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-yellow-300">Battle Log</h3>
          <div className="mt-3 text-xs text-gray-300/70 max-h-64 overflow-auto space-y-2">
            {units.slice(0, 8).map((u) => (
              <div key={u.id} className="bg-gray-900/50 p-2 rounded flex justify-between">
                <div>
                  <div className="font-semibold capitalize">{u.type}</div>
                  <div className="text-gray-400 text-[11px]">{u.team}</div>
                </div>
                <div className="text-xs text-gray-200">{Math.round(u.hp)} HP</div>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}
