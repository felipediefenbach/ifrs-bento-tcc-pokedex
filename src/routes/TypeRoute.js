const express = require("express");

const TypeController = require("../controllers/TypeController");

const info = express.Router();

info.get("/:pokemonName", TypeController.typeInfo);

module.exports = info;
