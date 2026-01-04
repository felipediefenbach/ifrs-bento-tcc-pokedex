const express = require("express");

const MoveController = require("../controllers/MoveController");

const move = express.Router();

move.get("/:pokemonName", MoveController.moveList);
move.get("/:pokemonName/:pokemonLevel", MoveController.moveListByLevel);
move.put("/set/attack", MoveController.setAttackConfig);

module.exports = move;
