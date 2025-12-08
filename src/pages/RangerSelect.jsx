// src/pages/RangerSelect.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";

const RANGERS = [
  { id: "samurai-red", name: "Samurai Red", color: "from-red-600 to-yellow-500" },
  { id: "samurai-blue", name: "Samurai Blue", color: "from-blue-600 to-sky-400" },
  { id: "samurai-pink", name: "Samurai Pink", color: "from-pink-500 to-rose-400" },
  { id: "black", name: "Black Ranger", color: "from-neutral-800 to-gray-700" },
  { id: "green", name: "Green Ranger", color: "from-green-600 to-lime-400" },
  { id: "yellow", name: "Yellow Ranger", color: "from-yellow-400 to-amber-500" },
];

export default function RangerSelect() {
  const navigate = useNavigate();
  const setPlayerRanger = useGameStore((s) => s.setPlayerRanger); // 👈 NEW

  function chooseRanger(rangerId) {
    setPlayerRanger(rangerId);   // Save selected ranger into Zustand
    navigate(`/story/${rangerId}`);
  }

  return (
    <div className="space-y-8">

      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-300">Choose Your Samurai Ranger</h2>
        <p className="text-sm text-gray-300/70">Click a ranger to continue.</p>
      </div>

      {/* Ranger Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {RANGERS.map((r) => (
          <button
            key={r.id}
            onClick={() => chooseRanger(r.id)} // 👈 UPDATED
            className="
              rounded-xl p-4
              bg-gradient-to-b from-black/60 to-gray-900
              border border-yellow-600/20
              shadow-xl shadow-black/40
              hover:scale-105 hover:shadow-yellow-600/20
              transition
            "
          >
            {/* Ranger Image */}
            <div className="relative w-full h-56 flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={`/rangers/${r.id}.webp`}
                onError={(e) => { e.currentTarget.src = `/rangers/${r.id}.jpg`; }}
                alt={r.name}
                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
              />
            </div>

            {/* Ranger Name */}
            <div className="mt-4 text-center">
              <div className="text-xl font-semibold text-yellow-300">{r.name}</div>

              {/* Power bar */}
              <div className={`mt-3 h-1 w-full rounded-full bg-gradient-to-r ${r.color}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
