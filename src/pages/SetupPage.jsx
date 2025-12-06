// src/pages/SetupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";

export default function SetupPage() {
  const navigate = useNavigate();

  const gridSize = useGameStore((s) => s.gridSize);
  const player = useGameStore((s) => s.player);
  const unitDefs = useGameStore((s) => s.unitDefs);

  const addUnplaced = useGameStore((s) => s.addUnplaced);
  const removeUnplaced = useGameStore((s) => s.removeUnplaced);
  const placeUnit = useGameStore((s) => s.placeUnit);
  const setLogic = useGameStore((s) => s.setLogic);
  const autoPlaceBot = useGameStore((s) => s.autoPlaceBot);
  // CORRECT: select the resetPlacement function from store
  const resetGridOnly = useGameStore((s) => s.resetPlacement);

  const [dragOverCell, setDragOverCell] = useState(null);

  // balanced size so no scroll
  const cell = 52;
  const boardPx = gridSize * cell;
  const midCol = Math.floor((gridSize - 1) / 2);

  function handleAdd(type) {
    const total = player.unplaced.length + player.units.length;
    if (total >= 4) {
      alert("You can add exactly 4 troops.");
      return;
    }
    addUnplaced(type);
  }

  function handleDrop(e, x, y) {
    const id = e.dataTransfer.getData("unitId");
    if (!id) return;
    if (x > midCol) {
      alert("Place only on the left half.");
      return;
    }
    placeUnit(id, x, y);
    setDragOverCell(null);
  }

  function handleStart() {
    if (player.units.length !== 4) {
      alert("Place 4 troops to continue!");
      return;
    }
    autoPlaceBot();
    navigate("/battle");
  }

  function accent(type) {
    if (type === "soldier") return "bg-red-600";
    if (type === "archer") return "bg-blue-600";
    if (type === "tank") return "bg-yellow-400 text-black";
    return "bg-gray-600";
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/rangers/bg-arena.webp')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 flex gap-6 p-4">
        {/* Column 1 - Logic */}
        <aside className="w-64 bg-black/70 border border-yellow-500/20 rounded-xl p-4 shadow-lg">
          <h2 className="text-xl text-yellow-300 font-semibold">Logic Presets</h2>

          {["soldier", "archer", "tank"].map((t) => (
            <div key={t} className="mt-4 bg-gray-900/50 p-3 rounded border border-yellow-600/10">
              <div className="flex items-center justify-between text-gray-200">
                <span className="capitalize">{t}</span>
                <span className="text-xs text-gray-400">HP: {unitDefs[t].hp}</span>
              </div>

              <select
                value={player.logic[t]}
                onChange={(e) => setLogic(t, e.target.value)}
                className="mt-2 w-full bg-gray-800 text-gray-200 border border-yellow-600/20 rounded px-2 py-1 text-sm"
              >
                <option value="aggressive">Aggressive</option>
                <option value="defensive">Defensive</option>
                <option value="ranged">Ranged</option>
                <option value="skirmish">Skirmish</option>
              </select>
            </div>
          ))}
        </aside>

        {/* Column 2 - Troops */}
        <aside className="w-64 bg-black/70 border border-yellow-500/20 rounded-xl p-4 shadow-lg">
          <h2 className="text-xl text-yellow-300 font-semibold">Troops</h2>

          <div className="grid grid-cols-1 gap-3 mt-4">
            <button
              onClick={() => handleAdd("soldier")}
              className="flex items-center justify-between bg-gray-900/60 p-3 rounded border border-yellow-500/20"
            >
              <span className="text-gray-200">Soldier</span>
              <span className="px-3 py-1 bg-red-600 text-black rounded">+ Add</span>
            </button>

            <button
              onClick={() => handleAdd("archer")}
              className="flex items-center justify-between bg-gray-900/60 p-3 rounded border border-yellow-500/20"
            >
              <span className="text-gray-200">Archer</span>
              <span className="px-3 py-1 bg-blue-600 text-black rounded">+ Add</span>
            </button>

            <button
              onClick={() => handleAdd("tank")}
              className="flex items-center justify-between bg-gray-900/60 p-3 rounded border border-yellow-500/20"
            >
              <span className="text-gray-200">Tank</span>
              <span className="px-3 py-1 bg-yellow-400 text-black rounded">+ Add</span>
            </button>
          </div>

          <h3 className="mt-6 text-yellow-300 text-sm font-semibold">Unplaced Units</h3>

          <div className="mt-2 space-y-2 max-h-48 overflow-auto pr-1">
            {player.unplaced.map((u) => (
              <div
                key={u.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("unitId", u.id)}
                className="flex items-center justify-between bg-gray-900/50 p-2 rounded border border-yellow-500/20 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-bold ${accent(u.type)}`}>
                    {u.type[0].toUpperCase()}
                  </div>
                  <span className="text-gray-200 capitalize">{u.type}</span>
                </div>

                <button
                  onClick={() => removeUnplaced(u.id)}
                  className="text-xs bg-red-600 px-2 py-1 rounded text-black"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Column 3 - Grid */}
        <main className="flex-1">
          <div className="bg-black/70 border border-yellow-500/20 rounded-xl  p-4 text-yellow-300 shadow-lg ">
            <h2 className="text-lg font-semibold pl-10">Troops Placement</h2>
          </div>

          <div className="mt-3 bg-black/60 border border-yellow-500/20 rounded-xl p-4 flex justify-center shadow-inner">
            <div
              className="grid"
              style={{
                width: boardPx,
                gridTemplateColumns: `repeat(${gridSize}, ${cell}px)`,
                gridTemplateRows: `repeat(${gridSize}, ${cell}px)`
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                const x = i % gridSize;
                const y = Math.floor(i / gridSize);
                const placed = player.units.find((u) => u.x === x && u.y === y);

                const highlight =
                  dragOverCell &&
                  dragOverCell.x === x &&
                  dragOverCell.y === y &&
                  x <= midCol;

                return (
                  <div
                    key={i}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverCell({ x, y });
                    }}
                    onDrop={(e) => handleDrop(e, x, y)}
                    onDragLeave={() => setDragOverCell(null)}
                    className="border border-yellow-500/10 flex items-center justify-center transition-all"
                    style={{
                      width: cell,
                      height: cell,
                      background: highlight
                        ? "rgba(253, 224, 71, 0.25)"
                        : "rgba(255,255,255,0.03)"
                    }}
                  >
                    {placed && (
                      <div className={`w-12 h-12 rounded flex items-center justify-center font-bold ${accent(placed.type)}`}>
                        {placed.type[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RESET + START aligned */}
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={resetGridOnly}
              className="px-6 py-2 rounded-lg font-bold bg-red-600 text-black hover:bg-red-500"
            >
              Reset
            </button>

            <button
              onClick={handleStart}
              disabled={player.units.length !== 4}
              className={`px-6 py-2 rounded-lg font-bold ${
                player.units.length === 4
                  ? "bg-yellow-400 text-black hover:scale-105"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Start Battle
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
