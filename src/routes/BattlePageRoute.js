const express = require("express");
const path = require('path');
const battle = express.Router();

// Route for the homepage
battle.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views', 'battle.html'));
});

module.exports = battle;