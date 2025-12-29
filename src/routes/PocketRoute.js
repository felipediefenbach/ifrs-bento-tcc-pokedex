const express = require('express');

const PocketController = require('../controllers/PocketController');

const pocket = express.Router();

pocket.post("/list", PocketController.allPockets);
pocket.post("/content", PocketController.allInThePocket)
// pocket.post("/add", PocketController.addInThePocketSlot)

module.exports = pocket;
