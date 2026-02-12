const express = require("express");
const authenticateToken = require("../middlewares/jwtMiddleware");

const TypeController = require("../controllers/TypeController");

const info = express.Router();

info.use(authenticateToken);

info.get("/:pokemonName", TypeController.typeInfo);

module.exports = info;
