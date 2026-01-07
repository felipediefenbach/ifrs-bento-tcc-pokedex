const express = require("express");

const BattleController = require("../controllers/BattleController");

const battle = express.Router();

battle.get("/load/:battleCycle/:trainerName/:pocketName", BattleController.loadAdversaries);

module.exports = battle;
