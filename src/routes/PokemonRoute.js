const express = require('express');
const authenticateToken = require("../middlewares/jwtMiddleware");

const PokemonController = require('../controllers/PokemonController');

const pokemon = express.Router();

pokemon.use(authenticateToken);

pokemon.get('/', PokemonController.allPokemonNames);
pokemon.post('/add', PokemonController.addPokemon);

module.exports = pokemon;