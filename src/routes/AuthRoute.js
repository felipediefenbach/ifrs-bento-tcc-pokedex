const express = require("express");

const AuthController = require("../controllers/AuthController");

const auth = express.Router();

auth.post("/add", AuthController.register);
auth.post("/log", AuthController.login);

module.exports = auth;
