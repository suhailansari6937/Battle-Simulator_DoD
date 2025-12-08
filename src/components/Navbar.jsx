import { Link, useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";

export default function Navbar() {
  const resetAll = useGameStore((s) => s.resetAll);
  const navigate = useNavigate();

  return (
    <header className="bg-black/50 backdrop-blur-md border-b border-blue-500/20 p-4 flex items-center justify-between">

      {/* LEFT — LOGO + TITLE */}
      <div className="flex items-center gap-4">
        <img
          src="/rangers/logo.webp"
          alt="Ranger Logo"
          className="w-12 h-12 rounded-full border border-blue-400/40 shadow-md object-cover"
        />

        <div>
          <h1 className="text-xl font-semibold text-blue-300 tracking-wide">
            SamuraX: The Ranger Ops Simulation
          </h1>
          {/* <div className="text-xs text-blue-300/50 tracking-wider">
            Samurai Tech Command Interface
          </div> */}
        </div>
      </div>

      {/* RIGHT — NAVIGATION */}
      <nav className="flex items-center gap-2">
        <Link to="/" className="px-3 py-1 rounded-md bg-blue-900/40 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-800/40 transition">Dashboard</Link>

        <Link to="/rangers" className="px-3 py-1 rounded-md bg-blue-900/40 border border-blue-500/30 hover:text-white hover:bg-blue-800/40 transition">Rangers</Link>

        <Link to="/setup" className="px-3 py-1 rounded-md bg-blue-900/40 border border-blue-500/30 hover:text-white hover:bg-blue-800/40 transition">Setup</Link>

        <Link to="/battle" className="px-3 py-1 rounded-md bg-blue-900/40 border border-blue-500/30 hover:text-white hover:bg-blue-800/40 transition">Battle</Link>

        <Link to="/results" className="px-3 py-1 rounded-md bg-blue-900/40 border border-blue-500/30 hover:text-white hover:bg-blue-800/40 transition">Results</Link>

        <button
          className="px-3 py-1 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 text-black font-semibold ml-2 hover:brightness-110 transition"
          onClick={() => { resetAll(); navigate("/"); }}
        >
          Reset
        </button>
      </nav>
    </header>
  );
}
