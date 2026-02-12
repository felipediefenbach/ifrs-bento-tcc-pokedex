const express = require("express");
const authenticateToken = require("../middlewares/jwtMiddleware");

const EvoController = require("../controllers/EvoController");

const evo = express.Router();

evo.use(authenticateToken);

evo.get("/:pokemonName", EvoController.evoSequence);

module.exports = evo;
