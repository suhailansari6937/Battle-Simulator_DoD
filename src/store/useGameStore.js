import { create } from "zustand";

const API_BASE = "http://localhost:4000"; // backend URL

const unitDefs = {
  soldier: { hp: 100, atk: 20, range: 1, symbol: "S", color: "#22c55e" },
  archer: { hp: 60, atk: 30, range: 4, symbol: "A", color: "#f59e0b" },
  tank: { hp: 150, atk: 15, range: 1, symbol: "T", color: "#7c3aed" }
};

const useGameStore = create((set, get) => ({
  gridSize: 10,
  unitDefs,

  // NEW: store which ranger the player chose
  playerRanger: null,

  setPlayerRanger(id) {
    set(() => ({ playerRanger: id }));
  },

  // GAME STATE
  player: {
    logic: { soldier: "aggressive", archer: "ranged", tank: "tank-aggr" },
    unplaced: [],
    units: []
  },

  bot: {
    units: []
  },

  sim: {
    result: null
  },

  // NEW: results fetched from backend (history)
  resultsHistory: [],


  // ========================
  // LOGIC PRESETS
  // ========================
  setLogic(type, logic) {
    set((state) => ({
      player: {
        ...state.player,
        logic: { ...state.player.logic, [type]: logic }
      }
    }));
  },


  // ========================
  // UNIT MANAGEMENT
  // ========================
  addUnplaced(type) {
    const id = type + "-" + Date.now();
    set((state) => ({
      player: {
        ...state.player,
        unplaced: [...state.player.unplaced, { id, type }]
      }
    }));
  },

  removeUnplaced(id) {
    set((state) => ({
      player: {
        ...state.player,
        unplaced: state.player.unplaced.filter((u) => u.id !== id)
      }
    }));
  },

  placeUnit(id, x, y) {
    const { unitDefs } = get();

    set((state) => {
      const unplaced = state.player.unplaced;
      const idx = unplaced.findIndex((u) => u.id === id);
      if (idx === -1) return state;

      const unit = unplaced[idx];
      const def = unitDefs[unit.type];

      return {
        player: {
          ...state.player,
          unplaced: unplaced.filter((u) => u.id !== id),
          units: [
            ...state.player.units,
            {
              id: unit.id,
              type: unit.type,
              x,
              y,
              hp: def.hp,
              stats: { moves: 0, damage: 0 }
            }
          ]
        }
      };
    });
  },


  // ========================
  // BOT AUTO PLACEMENT
  // ========================
  autoPlaceBot() {
    const { unitDefs } = get();
    const count = get().player.units.length;
    const size = get().gridSize;
    const rightCols = [5, 6, 7, 8, 9];

    const newBotUnits = [];

    for (let i = 0; i < count; i++) {
      const types = ["soldier", "archer", "tank"];
      const type = types[Math.floor(Math.random() * types.length)];
      const def = unitDefs[type];

      let x, y;
      do {
        x = rightCols[Math.floor(Math.random() * rightCols.length)];
        y = Math.floor(Math.random() * size);
      } while (newBotUnits.some((u) => u.x === x && u.y === y));

      newBotUnits.push({
        id: "bot-" + Date.now() + "-" + i,
        type,
        x,
        y,
        hp: def.hp,
        stats: { moves: 0, damage: 0 }
      });
    }

    set(() => ({
      bot: { units: newBotUnits }
    }));
  },


  // ============================================================
  // SAVE RESULT (LOCAL + SEND TO BACKEND)
  // ============================================================
 async saveResult(result) {
  const playerRanger = get().playerRanger;

  // store locally for ResultsPage
  set(() => ({
    sim: { result }
  }));

  // send to backend
  try {
    await fetch(`${API_BASE}/api/results/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        winner: result.winner,
        units: result.units,
        selectedRanger: playerRanger,
        createdAt: Date.now()
      })
    });

    console.log("✅ Result sent to backend");
  } catch (err) {
    console.log("⚠️ Failed to save result to backend:", err);
  }
},


  // ============================================================
  // FETCH RESULT HISTORY FROM BACKEND
  // ============================================================
  async fetchResults() {
    try {
      const res = await fetch(`${API_BASE}/api/results`);
      const data = await res.json();

      if (data.ok) {
        set(() => ({ resultsHistory: data.results }));
      }
    } catch (err) {
      console.log("⚠️ Error fetching results:", err);
    }
  },


  // ========================
  // RESET FUNCTIONS
  // ========================
  resetPlacement() {
    set((state) => ({
      player: {
        ...state.player,
        units: []
      },
      bot: { units: [] }
    }));
  },

  resetAll() {
    set(() => ({
      playerRanger: null,
      player: {
        logic: { soldier: "aggressive", archer: "ranged", tank: "tank-aggr" },
        unplaced: [],
        units: []
      },
      bot: { units: [] },
      sim: { result: null },
      resultsHistory: []
    }));
  }
}));

export default useGameStore;
