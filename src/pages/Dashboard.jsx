// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGameStore from "../store/useGameStore";

export default function Dashboard() {
  const { fetchResults, resultsHistory } = useGameStore();

  useEffect(() => {
    fetchResults();
  }, []);

  const rangers = [
    { id: "samurai-red", name: "Samurai Red" },
    { id: "samurai-blue", name: "Samurai Blue" },
    { id: "samurai-pink", name: "Samurai Pink" },
    { id: "black", name: "Black Ranger" },
    { id: "green", name: "Green Ranger" },
    { id: "yellow", name: "Yellow Ranger" }
  ];

  // Initialize stats for all rangers
  const stats = {};
  rangers.forEach(r => {
    stats[r.id] = { wins: 0, losses: 0, draws: 0, total: 0 };
  });

  // Calculate stats based on backend results
  resultsHistory.forEach(result => {
    const ranger = result.selectedRanger;
    if (!stats[ranger]) return;

    stats[ranger].total++;

    const win = result.winner?.toLowerCase();

    if (win === "player") stats[ranger].wins++;
    else if (win === "bot") stats[ranger].losses++;
    else stats[ranger].draws++;
  });

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat pb-20"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(10,10,10,0.9), rgba(5,5,5,0.95)),
          url('/rangers/bg.jpg')
        `
      }}
    >

      {/* ================= HERO BOX ================== */}
      <div className="flex justify-center pt-20">
        <div className="bg-black/60 border border-yellow-500/40 backdrop-blur-lg px-10 py-8 rounded-xl shadow-xl text-center max-w-xl">
          <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow mb-2">
            Ranger Operations Console
          </h1>
          <p className="text-gray-300 mb-6 tracking-wide">
            Power Rangers Division • Tactical Combat Simulator
          </p>

          <Link
            to="/rangers"
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-lg transition"
          >
            START GAME
          </Link>
        </div>
      </div>

      {/* ================= PERFORMANCE STATS ================== */}
      <h2 className="text-4xl text-yellow-300 font-bold text-center mt-20 mb-10 drop-shadow">
        Ranger Performance (All Rangers)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {rangers.map(r => (
          <div
            key={r.id}
            className="
              bg-black/60 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-xl
              hover:shadow-yellow-500/20 hover:-translate-y-1 transition
            "
          >
            <h3 className="text-xl font-bold text-yellow-300 mb-3">{r.name}</h3>

            <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-200">
              <span>Wins:</span>
              <span className="text-green-400">{stats[r.id].wins}</span>

              <span>Losses:</span>
              <span className="text-red-400">{stats[r.id].losses}</span>

              <span>Draws:</span>
              <span className="text-yellow-300">{stats[r.id].draws}</span>

              <span>Total Battles:</span>
              <span className="text-blue-400">{stats[r.id].total}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PREVIOUS BATTLES ================== */}
      <h2 className="text-3xl text-yellow-300 font-bold text-center underline underline-offset-4 mt-20">
        Previous Battles
      </h2>

      <div className="max-w-3xl mx-auto space-y-4 px-6 mt-6">
        {resultsHistory.length === 0 && (
          <p className="text-gray-300 text-center">No battles recorded yet.</p>
        )}

        {resultsHistory.map((result, idx) => {
          const win = result.winner?.toLowerCase();

          return (
            <div
              key={idx}
              className="
                flex items-center gap-6 bg-black/40 border border-white/10
                p-4 rounded-xl backdrop-blur-md shadow-md
                hover:-translate-y-1 hover:shadow-yellow-400/20 transition
              "
            >
              <div
                className={`
                  px-3 py-1 rounded-lg font-bold text-sm
                  ${
                    win === "player"
                      ? "bg-green-700/40 text-green-300"
                      : win === "bot"
                      ? "bg-red-700/40 text-red-300"
                      : "bg-yellow-700/40 text-yellow-300"
                  }
                `}
              >
                {win === "player"
                  ? "Player Victory"
                  : win === "bot"
                  ? "Bot Victory"
                  : "Draw"}
              </div>

              <div className="text-gray-300 text-sm">
                {new Date(result.createdAt).toLocaleString()}
              </div>

              <div className="ml-auto text-blue-300 text-sm font-semibold">
                Ranger: {result.selectedRanger}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
