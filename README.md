🗡️ SamuraX: The Ranger Ops Simulation
A futuristic, grid-based tactical combat simulator where Rangers command autonomous units in strategic, AI-driven battles.
Built with React, Zustand, TailwindCSS, Node.js, Express, and MongoDB, SamuraX focuses on tactical depth, minimal UI, and persistent battle history.

📌 Problem Statement (PS7)
Problem Code: PS7 – AI-Powered Tactical Grid Battle Simulator
Design and develop an interactive tactical battle simulator where players deploy units on a grid, and an autonomous AI engine resolves battles. The system must visually simulate combat, store battle results, and provide analytical insights.
SamuraX implements this end-to-end using a combination of a custom simulation engine, frontend UI, and a minimal backend.

🧭 Project Overview
SamuraX is a full-stack tactical simulator where:
	• The player selects a Ranger
	• Deploys units on a battle grid
	• Each unit follows AI-based movement & attack logic
	• Simulation runs autonomously
	• Results are recorded and displayed on a dashboard
Players can track ranger-specific win/loss statistics and revisit previous battles.

⚔️ Features Implemented
🎮 Gameplay Features
	• Ranger selection system
	• Ranger intro story animations
	• Drag-and-drop troop deployment
	• 10x10 battle grid
	• Three unit types (Soldier, Archer, Tank)
	• Adjustable logic presets (Aggressive / Defensive / Ranged / Skirmish)
🧠 Simulation Engine
	• Snapshot-based battle ticks
	• Nearest-enemy detection
	• Movement via Manhattan/Chebyshev distance
	• Attack range checks
	• Damage, HP, unit death handling
	• Automatic winner resolution
🔗 Backend Integration
	• Minimal Express.js backend
	• MongoDB database storage
	• Endpoints to save & fetch battle results
	• Dashboard analytics powered by backend data
📊 Dashboard Analytics
	• Ranger-wise performance stats
	• Total wins, losses, draws
	• Previous battle history with timestamps
	• Clean, minimal UI with blur/glass effects

🛠️ Tech Stack Used
Frontend
	• React
	• Zustand (state management)
	• TailwindCSS
	• React Router
	• Custom Simulation Engine (JavaScript)
Backend
	• Node.js
	• Express.js
	• MongoDB / Mongoose
Tools
	• Vercel (deployment)
	• Render.com (backend hosting)
	• MongoDB Atlas

🧱 System Architecture / High-Level Design

                      ┌────────────────────────┐
                      │       Frontend         │
                      │   React + Zustand      │
                      │   - UI/UX              │
                      │   - Simulation Engine  │
                      │   - State Management   │
                      │   - Dashboard Stats    │
                      └───────────┬────────────┘
                                  │ (REST API)
                                  ▼
                      ┌────────────────────────┐
                      │        Backend         │
                      │   Node.js + Express    │
                      │  /api/results (GET/POST) 
                      └───────────┬────────────┘
                                  │
                                  ▼
                      ┌────────────────────────┐
                      │       MongoDB          │
                      │ Battle results stored  │
                      │ Persistent history     │
                      └────────────────────────┘


📡 API Documentation
POST /api/results
Save the result of one completed battle.
Request Body:

{
  "winner": "Player",
  "selectedRanger": "samurai-blue",
  "units": [...],
  "createdAt": "timestamp"
}
Response:

{ "ok": true, "result": { ... } }

GET /api/results
Fetch all historical battle results.
Response:

{
  "ok": true,
  "results": [
    {
      "winner": "Player",
      "selectedRanger": "samurai-red",
      "units": [...],
      "createdAt": "..."
    }
  ]
}

🧪 How to Run Locally
1️⃣ Clone Repo
git clone https://github.com/<your-username>/SamuraX.git
cd SamuraX


2️⃣ Setup Backend
cd backend
npm install
Create .env file:

MONGO_URI=mongodb+srv://...
PORT=4000
Run backend:
npm run dev
3️⃣ Setup Frontend
cd ..
npm install
npm run dev
Frontend starts at:
http://localhost:5173


🖼️ Screenshots / GIFs
(Add real screenshots here — placeholders included.)
🟡 Dashboard



🔵 Ranger Selection



🟢 Setup Page



🔴 Battle Simulation



🟣 Results





🧷 Error Handling & Reliability Considerations
	• Backend uses try/catch for all DB operations
	• Simulation engine prevents invalid movement positions
	• Disabled start button until 4 units are placed
	• Backend rejects invalid payloads
	• Fetch failures do not break gameplay (results saved locally as fallback)

🤖 AI / ML Integration Details
(Not applicable — no ML model used)
AI logic is rule-based, not machine learning based.
The bot uses:
	• Nearest enemy detection
	• Range-based decision making
	• Simple deterministic movement

🧑‍🤝‍🧑 Team Members & Responsibilities
Member	Role	Responsibilities
Your Name	Developer	Frontend UI, Simulation Engine, Backend Integration, Deployment
(If more people are there, add them.)

🔮 Future Improvements
	• Leaderboards
	• Player accounts
	• Skill-based Ranger abilities
	• New unit types
	• Multiplayer battle arenas
	• Match replay system
	• Difficulty levels (Easy / Medium / Hard) - Smarter Bot
![Uploading image.png…]()
