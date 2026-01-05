const express = require("express");

const BattleController = require("../controllers/BattleController");

const battle = express.Router();

battle.get("/load/:cycle/:trainer/:pocket", BattleController.loadAdversaries);

module.exports = battle;
