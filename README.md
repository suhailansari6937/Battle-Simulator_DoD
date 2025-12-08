🗡️ SamuraX: The Ranger Ops Simulation

A futuristic, grid-based tactical combat simulator where Rangers command autonomous units in AI-driven battles. Built using React, Zustand, TailwindCSS, Node.js, Express, MongoDB, SamuraX emphasizes tactical depth, minimal UI, and persistent battle history.

📌 Problem Statement (PS7)

Problem Code: PS7 – AI-Powered Tactical Grid Battle Simulator

Design and develop an interactive tactical battle simulator where players deploy units on a grid, and an autonomous AI engine resolves the battle. The system must visually simulate combat, store results, and provide analytical insights.

SamuraX implements this end-to-end, including:

A custom simulation engine

A responsive and minimalistic UI

Backend with persistent battle history

🧭 Project Overview

SamuraX is a full-stack tactical simulator where:

Players select a Ranger

Deploy units on a battle grid

Units follow AI-based movement & attack logic

The simulation runs autonomously

Results are recorded and displayed on a dashboard

Players can track ranger-specific win/loss statistics and revisit battle history.

⚔️ Features Implemented
🎮 Gameplay Features

Ranger selection system

Intro story animations

Drag-and-drop troop deployment

10×10 tactical battle grid

Three unit types: Soldier, Archer, Tank

Adjustable logic presets: Aggressive / Defensive / Ranged / Skirmish

🧠 Simulation Engine

Snapshot-based battle ticks

Nearest-enemy detection

Manhattan & Chebyshev movement

Attack range validation

Damage, HP, and death handling

Automatic winner resolution

🔗 Backend Integration

Minimal Express.js backend

Battle results stored in MongoDB

Endpoints to save & fetch results

Dashboard analytics powered by backend data

📊 Dashboard Analytics

Ranger-wise performance stats

Wins, losses, draws

Historical battle logs with timestamps

Minimal UI with glass/blur effects

🛠️ Tech Stack
Frontend

React

Zustand

TailwindCSS

React Router

Custom JS simulation engine

Backend

Node.js

Express

MongoDB / Mongoose

Tools

Vercel (frontend deployment)

Render.com (backend hosting)

MongoDB Atlas

🧱 System Architecture
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
        │  /api/results GET/POST │
        └───────────┬────────────┘
                    │
                    ▼
        ┌────────────────────────┐
        │        MongoDB         │
        │  Persistent battle     │
        │      history           │
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
git clone https://github.com/YourUser/SamuraX.git
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
👉 http://localhost:5173

🖼️ Screenshots / GIFs

(Replace placeholders with real screenshots)

🟡 Dashboard

🔵 Ranger Selection

🟢 Setup Page

🔴 Battle Simulation

🟣 Results Page

🧷 Error Handling & Reliability

Backend wrapped in try/catch

Simulation engine prevents invalid moves

Start button disabled until 4 units placed

Backend rejects malformed payloads

Local fallback saving when backend fails

🤖 AI / ML Integration

No ML models used.
AI logic is rule-based, using:

Nearest enemy detection

Distance-based decision making

Simple deterministic movement

🧑‍🤝‍🧑 Team Members & Roles
Member	Role	Responsibilities
Your Name	Developer	Frontend UI, Simulation Engine, Backend Integration, Deployment

(Add more members if needed)

🔮 Future Improvements

Global leaderboards

Player accounts

Ranger skill abilities

New unit types

Multiplayer arenas

Match replay system

Difficulty levels (Easy / Medium / Hard)
