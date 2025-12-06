// src/pages/ResultsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";

export default function ResultsPage() {
  const navigate = useNavigate();
  const result = useGameStore((s) => s.sim.result);

  if (!result) return <div className="text-center mt-10 text-gray-300">No results available.</div>;

  const winner = result.winner;
  const isPlayerWin = winner === "Player";

  return (
    <div className="min-h-[78vh] w-full flex flex-col items-center p-6 text-gray-200">

      {/* ⭐ WINNER BANNER */}
      <div className="mt-4 mb-6 text-center">
        <h1
          className={`text-4xl font-extrabold tracking-wide drop-shadow-lg ${
            isPlayerWin ? "text-blue-400" : "text-red-400"
          }`}
        >
          {winner === "Draw" ? "MATCH DRAW" : `${winner} Wins`}
        </h1>

        <div
          className={`mt-2 h-1 w-32 mx-auto rounded-full ${
            isPlayerWin ? "bg-blue-500" : "bg-red-500"
          }`}
        ></div>
      </div>

      {/* CONTENT AREA */}
      <div className="w-full max-w-5xl grid grid-cols-2 gap-6 mt-4">

        {/* PLAYER RESULT SECTION */}
        <section className="bg-black/60 border border-blue-500/20 rounded-lg p-4 shadow-xl">
          <h2 className="text-xl font-semibold text-blue-400 mb-3">Your Troops</h2>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {result.units
              .filter((u) => u.side === "player")
              .map((u) => {
                const maxHp = u.maxHp ?? 100;
                const hpPct = Math.max(0, (u.hp / maxHp) * 100);

                return (
                  <div
                    key={u.id}
                    className="bg-gray-900/60 border border-blue-400/20 rounded-md p-3 flex items-center gap-3"
                  >
                    {/* Unit Icon */}
                    <img
                      src={`/rangers/${u.type}.png`}
                      alt={u.type}
                      className="w-10 h-10 object-contain drop-shadow-md"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <div className="text-sm font-bold text-blue-300 capitalize">{u.type}</div>

                      {/* HP BAR */}
                      <div className="mt-1 w-full h-2 bg-gray-800 rounded overflow-hidden">
                        <div
                          className="h-full bg-blue-400"
                          style={{ width: `${hpPct}%` }}
                        ></div>
                      </div>

                      <div className="text-xs mt-1 text-gray-400">
                        HP: {Math.round(u.hp)} | Damage: {u.stats?.damage ?? 0}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* BOT RESULT SECTION */}
        <section className="bg-black/60 border border-red-500/20 rounded-lg p-4 shadow-xl">
          <h2 className="text-xl font-semibold text-red-400 mb-3">Enemy Troops</h2>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {result.units
              .filter((u) => u.side === "bot")
              .map((u) => {
                const maxHp = u.maxHp ?? 100;
                const hpPct = Math.max(0, (u.hp / maxHp) * 100);

                return (
                  <div
                    key={u.id}
                    className="bg-gray-900/60 border border-red-400/20 rounded-md p-3 flex items-center gap-3"
                  >
                    {/* SYMBOL ONLY FOR BOT */}
                    <div className="w-10 h-10 flex items-center justify-center text-red-300 text-xl font-bold">
                      {u.type[0].toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-bold text-red-300 capitalize">{u.type}</div>

                      {/* HP BAR */}
                      <div className="mt-1 w-full h-2 bg-gray-800 rounded overflow-hidden">
                        <div
                          className="h-full bg-red-400"
                          style={{ width: `${hpPct}%` }}
                        ></div>
                      </div>

                      <div className="text-xs mt-1 text-gray-400">
                        HP: {Math.round(u.hp)} | Damage: {u.stats?.damage ?? 0}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/setup")}
          className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-black font-semibold shadow-md"
        >
          Play Again
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold shadow-md"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
