// src/App.jsx
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RangerSelect from "./pages/RangerSelect";
import RangerStory from "./pages/RangerStory";
import SetupPage from "./pages/SetupPage";
import BattlePage from "./pages/BattlePage";
import ResultsPage from "./pages/ResultsPage";
import useGameStore from "./store/useGameStore";
import Navbar from "./components/Navbar";


export default function App() {
  const resetAll = useGameStore((s) => s.resetAll);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-100">
      <Navbar />


      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rangers" element={<RangerSelect />} />
          <Route path="/story/:rangerId" element={<RangerStory />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
    </div>
  );
}
