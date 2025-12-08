const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    await mongoose.connect(uri);  // new versions don't need extra options
    console.log("🚀 MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
