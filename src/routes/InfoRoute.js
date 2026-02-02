const express = require("express");
const authenticateToken = require("../middlewares/jwtMiddleware");

const InfoController = require("../controllers/InfoController");

const info = express.Router();

info.use(authenticateToken);
info.get("/basic/:pokemonName", InfoController.basicInfo);

module.exports = info;
