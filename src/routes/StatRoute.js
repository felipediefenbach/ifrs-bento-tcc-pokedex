const express = require("express");

const StatController = require("../controllers/StatController");

const stat = express.Router();

stat.get("/:pokemonName", StatController.statInfo);

module.exports = stat;
