const MoveModel = require("../models/MoveModel");
const PokemonModel = require("../models/PokemonModel");
const pokeMove = require("../utils/pokeMove");
const movePp = require("../utils/movePp");

class MoveService {
  static async moveList(fulldata) {

    const existingMoves = await MoveModel.findPokemonMoveByName(fulldata);

    if (existingMoves.length === 0) {

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

    const { pokemonLevel } = fulldata;
    
    let arrayMoves = [];
    const getedMovesAndLevels = await MoveModel.findPokemonMoveByName(fulldata);

    getedMovesAndLevels.map(moves => {
      if (moves.level <= pokemonLevel) {
        arrayMoves = arrayMoves.concat(moves.moves.split(','));
      }
    });

    const resultMoves = arrayMoves.map(element => element.trim());
    return resultMoves
    
  }

  static async setAttackConfig(fulldata) {
    
    let moveWithPp = []
    let { moveList } = fulldata;
    const arrayMoves = moveList.split(',');
    
    for ( const element of arrayMoves ) {
      moveWithPp.push(`${element}|${await movePp(element)}`);
    }

    fulldata['moveList'] = moveWithPp.join(',');
    console.log(fulldata);
    return MoveModel.setAttackConfig(fulldata);
  }

}

module.exports = MoveService;
