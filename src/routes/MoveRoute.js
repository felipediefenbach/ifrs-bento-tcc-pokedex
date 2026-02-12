const express = require("express");
const authenticateToken = require("../middlewares/jwtMiddleware");

const MoveController = require("../controllers/MoveController");

const move = express.Router();

move.use(authenticateToken);

move.get("/:pokemonName/:pokemonLevel", MoveController.moveListByLevel);
move.put("/set/attack", MoveController.setAttackConfig);

module.exports = move;
