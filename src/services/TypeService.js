const TypeModel = require("../models/TypeModel");
const PokemonModel = require("../models/PokemonModel");
const pokeType = require("../utils/pokeType");

class TypeService {
  static async typeInfo(fulldata) {

    const existingPokemon = await TypeModel.findPokemonTypeByName(fulldata);

    if (existingPokemon.length === 0) {

      const pokemonTypes = await pokeType(fulldata);
      const pokemonId = await PokemonModel.findPokemonIdByName(fulldata);
      const result = await TypeModel.addPokemonType({pokemonId, pokemonTypes});
      return result === 1 ? await TypeModel.findPokemonTypeByName(fulldata) : null;
      
    } else {
      return existingPokemon
    }
  }
}

module.exports = TypeService;
