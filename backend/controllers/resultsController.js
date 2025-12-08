const Result = require("../models/Result");

exports.createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    return res.status(201).json({ ok: true, result });
  } catch (err) {
    console.error("Error saving result:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    return res.json({ ok: true, results });
  } catch (err) {
    console.error("Error fetching results:", err);
    return res.status(500).json({ ok: false });
  }
};
