const express = require("express");

const InfoController = require("../controllers/InfoController");

const info = express.Router();

info.get("/basic/:pokemonName", InfoController.basicInfo);

module.exports = info;
