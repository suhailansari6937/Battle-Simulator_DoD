# 🗡️ SamuraX: The Ranger Ops Simulation

A futuristic, grid-based tactical combat simulator where Rangers command autonomous units in strategic, AI-driven battles. Built with React, Zustand, TailwindCSS, Node.js, Express, and MongoDB, SamuraX focuses on tactical depth, minimal UI, and persistent battle history.

![SamuraX Banner](https://via.placeholder.com/1200x300/1a1a2e/eee?text=SamuraX+-+Tactical+Grid+Battle+Simulator)

---

## 📌 Problem Statement (PS7)

**Problem Code:** PS7 – AI-Powered Tactical Grid Battle Simulator

Design and develop an interactive tactical battle simulator where players deploy units on a grid, and an autonomous AI engine resolves battles. The system must visually simulate combat, store battle results, and provide analytical insights.

SamuraX implements this end-to-end using a combination of a custom simulation engine, frontend UI, and a minimal backend.

---

## 🧭 Project Overview

SamuraX is a full-stack tactical simulator where:

1. The player selects a **Ranger**
2. Deploys **units** on a battle grid
3. Each unit follows **AI-based movement & attack logic**
4. Simulation runs **autonomously**
5. Results are **recorded and displayed** on a dashboard
6. Players can track **ranger-specific win/loss statistics** and revisit previous battles

---

## ⚔️ Features Implemented

### 🎮 Gameplay Features

- ✅ Ranger selection system
- ✅ Ranger intro story animations
- ✅ Drag-and-drop troop deployment
- ✅ 10x10 battle grid
- ✅ Three unit types (Soldier, Archer, Tank)
- ✅ Adjustable logic presets (Aggressive / Defensive / Ranged / Skirmish)

### 🧠 Simulation Engine

- ✅ Snapshot-based battle ticks
- ✅ Nearest-enemy detection
- ✅ Movement via Manhattan/Chebyshev distance
- ✅ Attack range checks
- ✅ Damage, HP, unit death handling
- ✅ Automatic winner resolution

### 🔗 Backend Integration

- ✅ Minimal Express.js backend
- ✅ MongoDB database storage
- ✅ Endpoints to save & fetch battle results
- ✅ Dashboard analytics powered by backend data

### 📊 Dashboard Analytics

- ✅ Ranger-wise performance stats
- ✅ Total wins, losses, draws
- ✅ Previous battle history with timestamps
- ✅ Clean, minimal UI with blur/glass effects

---

## 🛠️ Tech Stack Used

### Frontend

- **React** - UI library
- **Zustand** - State management
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Custom Simulation Engine** - JavaScript-based battle logic

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB / Mongoose** - Database

### Tools

- **Vercel** - Frontend deployment
- **Render.com** - Backend hosting
- **MongoDB Atlas** - Cloud database

---

## 🧱 System Architecture / High-Level Design

```
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
                    │  /api/results (GET/POST)│
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │       MongoDB          │
                    │ Battle results stored  │
                    │ Persistent history     │
                    └────────────────────────┘
```

---

## 📡 API Documentation

### `POST /api/results`

Save the result of one completed battle.

**Request Body:**

```json
{
  "winner": "Player",
  "selectedRanger": "samurai-blue",
  "units": [...],
  "createdAt": "timestamp"
}
```

**Response:**

```json
{
  "ok": true,
  "result": { ... }
}
```

### `GET /api/results`

Fetch all historical battle results.

**Response:**

```json
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
```

---

## 🧪 How to Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/SamuraX.git
cd SamuraX
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=mongodb+srv://...
PORT=4000
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ..
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

---



## 🖼️ Screenshots / GIFs


### 🟡 Dashboard

![Dashboard](https://via.placeholder.com/800x450/f39c12/fff?text=Dashboard+Analytics)

### 🔵 Ranger Selection

![Ranger Selection](https://via.placeholder.com/800x450/3498db/fff?text=Ranger+Selection)

### 🟢 Setup Page

![Setup Page](https://via.placeholder.com/800x450/2ecc71/fff?text=Troop+Deployment)

### 🔴 Battle Simulation

![Battle Simulation](https://via.placeholder.com/800x450/e74c3c/fff?text=Live+Battle+Simulation)

### 🟣 Results

![Results](https://via.placeholder.com/800x450/9b59b6/fff?text=Battle+Results)

---

## 🧷 Error Handling & Reliability Considerations

- ✅ Backend uses try/catch for all DB operations
- ✅ Simulation engine prevents invalid movement positions
- ✅ Disabled start button until 4 units are placed
- ✅ Backend rejects invalid payloads
- ✅ Fetch failures do not break gameplay (results saved locally as fallback)

---

## 🤖 AI / ML Integration Details

> **Note:** No ML model used. AI logic is rule-based, not machine learning based.

The bot uses:

- Nearest enemy detection
- Range-based decision making
- Simple deterministic movement

---

## 🧑‍🤝‍🧑 Team Members & Responsibilities

| Member    | Role      | Responsibilities                                                |
| --------- | --------- | --------------------------------------------------------------- |
| Md Suhail | Developer | Frontend UI, Backend Integration, Dashboard  |
| Krishna Kumar | Developer | Frontend UI, Simulation Engine, Backend Integration|
| Aditi Gupta | Developer |  Setup Troops |
| Sushobit | Developer | Shows Result |




## 🔮 Future Improvements

- [ ] Leaderboards
- [ ] Player accounts
- [ ] Skill-based Ranger abilities
- [ ] New unit types
- [ ] Multiplayer battle arenas
- [ ] Match replay system
- [ ] Difficulty levels (Easy / Medium / Hard)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Problem Statement provided by **PS7**
- Built as part of a tactical simulation challenge
- Special thanks to the open-source community

---

## 📧 Contact

For questions or feedback, reach out at:

- **Email:** md.2025ca056@mnnit.ac.in, krishna.2025ca052@mnnit.ac.in
- **GitHub:** https://github.com/suhailansari6937

---

<div align="center">
  <strong>⚔️ May the best Ranger win! ⚔️</strong>
</div>
