const express = require("express");
const authenticateToken = require("../middlewares/jwtMiddleware");
const BattleController = require("../controllers/BattleController");

const battle = express.Router();

battle.use(authenticateToken);

battle.get("/check/:trainerName/:pocketName", BattleController.checkFirstCombatblePokemons);
battle.get("/load/:trainerName/:pocketName", BattleController.loadAdversaries);
battle.get("/load/:battleCycle/:trainerName/:pocketName", BattleController.loadAdversariesByCycle);
battle.put("/upd/loser", BattleController.updLoser);
battle.put("/upd/winner", BattleController.updWinner);
battle.put("/upd/lvl", BattleController.updWinnerLevel);

module.exports = battle;
