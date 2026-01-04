const EvoModel = require("../models/EvoModel");
const PokemonModel = require("../models/PokemonModel");
const pokeEvo = require("../utils/pokeEvo");

class EvoService {
  static async evoSequence(fulldata) {

    const existingPokemon = await EvoModel.findPokemonEvoByName(fulldata);

    if (existingPokemon.length === 0) {

      const pokemonId = await PokemonModel.findPokemonIdByName(fulldata);
      const pokemonEvos = await pokeEvo({pokemonId});

      const result = await EvoModel.addPokemonEvo({pokemonId, pokemonEvos});
      return result === 1 ? await EvoModel.findPokemonEvoByName(fulldata) : null;
      
    } else {
      return existingPokemon
    }
  }
}

module.exports = EvoService;
