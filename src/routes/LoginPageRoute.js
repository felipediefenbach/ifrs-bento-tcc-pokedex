const express = require("express");
const path = require('path');
const login = express.Router();

// Route for the homepage
login.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views', 'login.html'));
});

module.exports = login;