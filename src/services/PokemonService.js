const PokemonModel = require("../models/PokemonModel");
const pokeBasicInfo = require("../utils/pokeBasicInfo");

class PokemonService {
  static async allPokemonNames() {
    return await PokemonModel.allPokemonNames();
  }

  static async addPokemon(fulldata) {

    const existingPokemon = await PokemonModel.findPokemonByName(fulldata);

    if (existingPokemon.length === 0) {
      const basicInfo = await pokeBasicInfo(fulldata);
      const result = await PokemonModel.addPokemon(basicInfo);
      return result === 1;
    } else {
      return false;
    }
  }
}

module.exports = PokemonService;
