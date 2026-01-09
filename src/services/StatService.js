const StatModel = require("../models/StatModel");
const PokemonModel = require("../models/PokemonModel");
const pokeStat = require("../utils/pokeStat");

class StatService {
  static async statInfo(fulldata) {

    const existingPokemon = await StatModel.findPokemonStatByName(fulldata);

    if (existingPokemon.length === 0) {

      let pokemonHp, pokemonAttack, pokemonDefense;
      const pokemonId = await PokemonModel.findPokemonIdByName(fulldata);
      const statList = await pokeStat(fulldata);

      statList.forEach(element => {
        
        if (element.stat_name === 'hp') {
          pokemonHp = element.base_stat

        } else if (element.stat_name === 'attack') {
          pokemonAttack = element.base_stat
        
        } else if (element.stat_name === 'defense') {
          pokemonDefense = element.base_stat
        
        }

      });

      const result = await StatModel.addPokemonStat({pokemonId, pokemonHp, pokemonAttack, pokemonDefense});
      return result === 1 ? await StatModel.findPokemonStatByName(fulldata) : null;
      
    } else {
      return existingPokemon
    }
    
  }
}

module.exports = StatService;
