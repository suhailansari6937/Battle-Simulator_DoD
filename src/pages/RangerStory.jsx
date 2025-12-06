
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const STORIES = {
  "samurai-red": {
    title: "Ryuu — Samurai Red",
    text: "Ryuu, the Red Samurai, is the fearless leader. His blade carries golden fire to cleave through darkness.",
    gradient: "from-red-600 to-yellow-500"
  },
  "samurai-blue": {
    title: "Sora — Samurai Blue",
    text: "Sora masters water and steel, striking with calm precision that pierces enemy lines.",
    gradient: "from-blue-600 to-sky-400"
  },
  "samurai-pink": {
    title: "Hana — Samurai Pink",
    text: "Hana blends grace and ferocity; her speed and cunning outmaneuver any foe.",
    gradient: "from-pink-500 to-rose-400"
  },
  "black": {
    title: "Kage — Black Ranger",
    text: "Kage is the silent sentinel, powerful and unyielding — a living fortress.",
    gradient: "from-neutral-800 to-gray-700"
  },
  "green": {
    title: "Midori — Green Ranger",
    text: "Midori uses nature's cunning and agility to change the tide of battle.",
    gradient: "from-green-600 to-lime-400"
  },
  "yellow": {
    title: "Kin — Yellow Ranger",
    text: "Kin strikes with lightning speed, precise and deadly in the blink of an eye.",
    gradient: "from-yellow-400 to-amber-500"
  }
};

export default function RangerStory() {
  const { rangerId } = useParams();
  const navigate = useNavigate();
  const story = STORIES[rangerId] ?? STORIES["samurai-red"];
  const [progress, setProgress] = useState(0);

  // Auto advance after 5500ms (5.5s)
  useEffect(() => {
    const TOTAL = 5500;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, Math.round((elapsed / TOTAL) * 100)));
      if (elapsed >= TOTAL) {
        clearInterval(timer);
        navigate("/setup");
      }
    }, 100);

    return () => clearInterval(timer);
  }, [navigate]);

  function skip() {
    navigate("/setup");
  }

  return (
    <div onClick={skip} className="min-h-[72vh] flex items-center justify-center p-6 cursor-pointer bg-black text-gray-100">
      <div className="w-full max-w-3xl rounded-xl bg-gradient-to-b from-gray-900/80 to-black/80 border border-yellow-600/10 p-6 shadow-2xl">
        <div className={`w-full h-48 rounded-lg bg-gradient-to-r ${story.gradient} flex items-center justify-center text-4xl font-extrabold text-black`}>
          <img src={`/rangers/${rangerId}.png`} alt={story.title} className="w-36 h-36 object-contain" onError={(e)=>{ e.currentTarget.style.display="none"; }}/>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-yellow-300">{story.title}</h2>
          <p className="mt-2 text-sm text-gray-200/90">{story.text}</p>
          <p className="text-xs text-gray-300/60 mt-2">Click anywhere to skip & enter setup</p>
        </div>

        {/* progress bar */}
        <div className="mt-5 h-2 w-full bg-gray-800 rounded-full overflow-hidden border border-yellow-600/5">
          <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
