const express = require('express');

const PokemonController = require('../controllers/PokemonController');

const pokemon = express.Router();

pokemon.get('/', PokemonController.allPokemonNames);
pokemon.post('/add', PokemonController.addPokemon);

module.exports = pokemon;