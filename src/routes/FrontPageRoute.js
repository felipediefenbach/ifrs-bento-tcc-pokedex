const express = require("express");
const path = require('path');
const front = express.Router();

// Route for the homepage
front.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views', 'index.html'));
});

module.exports = front;