const express = require("express");

const EvoController = require("../controllers/EvoController");

const evo = express.Router();

evo.get("/:pokemonName", EvoController.evoSequence);

module.exports = evo;
