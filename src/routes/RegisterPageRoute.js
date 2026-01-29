const express = require("express");
const path = require('path');
const register = express.Router();

// Route for the homepage
register.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views', 'register.html'));
});

module.exports = register;