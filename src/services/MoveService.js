const MoveModel = require("../models/MoveModel");
const PokemonModel = require("../models/PokemonModel");
const pokeMove = require("../utils/pokeMove");
const movePp = require("../utils/movePp");

class MoveService {
  static async moveList(fulldata) {

    const existingMoves = await MoveModel.findPokemonMoveByName(fulldata);

    if (!existingMoves || existingMoves.length === 0) {

      let listSize = 0;
      const pokemonId = await PokemonModel.findPokemonIdByName(fulldata);
      const getedMoves = await pokeMove(fulldata);

      for (const element of getedMoves) {
        const { pokemonMoves, pokemonLevel } = element;
        const result = await MoveModel.addPokemonMove({ pokemonId, pokemonMoves, pokemonLevel});
        listSize += result;
      };

      if (listSize === getedMoves.length) {
        return await MoveModel.findPokemonMoveByName(fulldata);
      }

    } else {
      return existingMoves
   
    }
  }

  static async moveListByLevel(fulldata) {

    const existingMoves = await MoveModel.findPokemonMoveByLevel(fulldata);

    if (!existingMoves || existingMoves.length === 0) {

      let listSize = 0;
      const pokemonId = await PokemonModel.findPokemonIdByName(fulldata);
      const getedMoves = await pokeMove(fulldata);

      for (const element of getedMoves) {
        const { pokemonMoves, pokemonLevel } = element;
        const result = await MoveModel.addPokemonMove({ pokemonId, pokemonMoves, pokemonLevel });
        listSize += result;
      };

      if (listSize === getedMoves.length) {
        return await MoveModel.findPokemonMoveByLevel(fulldata);
      }

    } else {
      return existingMoves
   
    }
    
  }

  static async setAttackConfig(fulldata) {
    console.log(fulldata);

    let moveWithPp = []
    let { moveList } = fulldata;
    const arrayMoves = moveList.split(',');
    
    for ( const element of arrayMoves ) {
      const movePpPower = await movePp(element.trim());
      console.log(movePpPower);
      moveWithPp.push(`${element.trim()}|${movePpPower}`);
    }

    fulldata['moveList'] = moveWithPp.join(',');
    return MoveModel.setAttackConfig(fulldata);
  }

}

module.exports = MoveService;
