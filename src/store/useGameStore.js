import { create } from "zustand";

const unitDefs = {
  soldier: { hp: 100, atk: 20, range: 1, symbol: "S", color: "#22c55e" },
  archer: { hp: 60, atk: 30, range: 4, symbol: "A", color: "#f59e0b" },
  tank: { hp: 150, atk: 15, range: 1, symbol: "T", color: "#7c3aed" }
};

const useGameStore = create((set, get) => ({
  gridSize: 10,
  unitDefs,
  
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

  // UPDATE LOGIC
  setLogic(type, logic) {
    set((state) => ({
      player: {
        ...state.player,
        logic: { ...state.player.logic, [type]: logic }
      }
    }));
  },

  // ADD UNPLACED UNIT
  addUnplaced(type) {
    const id = type + "-" + Date.now();
    set((state) => ({
      player: {
        ...state.player,
        unplaced: [...state.player.unplaced, { id, type }]
      }
    }));
  },

  // REMOVE UNPLACED UNIT
  removeUnplaced(id) {
    set((state) => ({
      player: {
        ...state.player,
        unplaced: state.player.unplaced.filter((u) => u.id !== id)
      }
    }));
  },

  // PLACE UNIT ON GRID
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

  // AUTO PLACE BOT UNITS
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

  // SAVE RESULT
  saveResult(result) {
    set(() => ({
      sim: { result }
    }));
  },

  // ⭐ RESET ONLY PLAYER GRID PLACEMENT (requested)
  resetPlacement() {
    set((state) => ({
      player: {
        ...state.player,
        units: []  // removes ONLY placed units
      },
      bot: {
        units: [] // clear bot as well
      }
    }));
  },

  // FULL RESET (already existed)
  resetAll() {
    set(() => ({
      player: {
        logic: { soldier: "aggressive", archer: "ranged", tank: "tank-aggr" },
        unplaced: [],
        units: []
      },
      bot: { units: [] },
      sim: { result: null }
    }));
  }
}));

export default useGameStore;
