const express = require("express");
const authenticateToken = require("../middlewares/jwtMiddleware");
const path = require('path');
const battle = express.Router();

battle.use(authenticateToken);

battle.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views', 'battle.html'));
});

module.exports = battle;