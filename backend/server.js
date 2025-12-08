require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/results", require("./routes/resultRoutes"));

// root route
app.get("/", (req, res) => {
  res.send("Ranger Backend Running");
});

// start server
connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
