const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  id: String,
  type: String,
  side: String,
  hp: Number,
  stats: {
    moves: Number,
    damage: Number
  }
}, { _id: false });

const ResultSchema = new mongoose.Schema({
  winner: String,
  selectedRanger: String,
  units: [UnitSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", ResultSchema);
