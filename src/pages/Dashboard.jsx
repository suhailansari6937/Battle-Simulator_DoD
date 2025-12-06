
import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../public/rangers/samurai-bg.jpg";


export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[72vh] flex items-center justify-center">

      {/* Background Samurai Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}

      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-3xl">

        {/* Title Panel */}
        <div className="bg-black/50 border border-yellow-500/30 rounded-xl px-8 py-6 shadow-2xl">
          <h1 className="text-5xl font-extrabold tracking-wide text-yellow-300 drop-shadow-lg">
            Ranger Operations Console
          </h1>
          <p className="mt-2 text-gray-300 text-sm">
            Power Rangers Division • Tactical Combat Simulator
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-gray-300/80 text-sm max-w-xl">
          Prepare your Samurai. Choose your Ranger. Enter the battlefield 🔥.
        </p>

        {/* Start Game Button */}
        <button
          onClick={() => navigate("/rangers")}
          className="
            px-8 py-3 rounded-md 
            bg-gradient-to-br from-yellow-400 to-yellow-600 
            text-black font-bold text-lg
            shadow-xl shadow-yellow-600/40
            hover:scale-105 active:scale-95 transition
          "
        >
          START GAME
        </button>

        {/* Quick Setup Option */}
        <button
          onClick={() => navigate("/setup")}
          className="
            px-6 py-2 rounded-md
            bg-black/40 border border-yellow-500/30
            text-gray-200 text-sm
            hover:bg-black/60 transition
          "
        >
          Quick Setup
        </button>

      </div>
    </div>
  );
}
