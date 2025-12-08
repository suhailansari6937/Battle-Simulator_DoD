const express = require("express");
const router = express.Router();
const controller = require("../controllers/resultsController");

router.post("/", controller.createResult);
router.get("/", controller.getResults);

module.exports = router;
