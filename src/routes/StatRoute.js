const express = require("express");
const authenticateToken = require("../middlewares/jwtMiddleware");

const StatController = require("../controllers/StatController");

const stat = express.Router();

stat.use(authenticateToken);

stat.get("/:pokemonName", StatController.statInfo);

module.exports = stat;
