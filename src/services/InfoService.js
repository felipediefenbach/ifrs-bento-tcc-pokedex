const InfoModel = require("../models/InfoModel");
const pokeBasicInfo = require("../utils/pokeBasicInfo");

class PokemonService {
  static async basicInfo(fulldata) {

    const existingPokemon = await InfoModel.findPokemonInfoByName(fulldata);

    if (existingPokemon.length === 0) {
      const basicInfo = await pokeBasicInfo(fulldata);
      const result = await InfoModel.addPokemonBasicInfo(basicInfo);
      return result === 1 ? await InfoModel.findPokemonInfoByName(fulldata) : null;
    } else {
      return existingPokemon
    }
  }
}

module.exports = PokemonService;
