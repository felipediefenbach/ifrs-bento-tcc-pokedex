const express = require("express");

const AuthController = require("../controllers/AuthController");

const auth = express.Router();

auth.post("/login", AuthController.login);
auth.post("/refresh", AuthController.refresh);
auth.post("/register", AuthController.register);

module.exports = auth;
