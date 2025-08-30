const express = require("express");
const router = express.Router();
const TextController = require("../controllers/TextController");

router.get("/dashboard", TextController.dashboard);
router.post("/create", TextController.createText);

module.exports = router;