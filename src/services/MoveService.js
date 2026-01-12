const MoveModel = require("../models/MoveModel");
const PokemonModel = require("../models/PokemonModel");
const pokeMove = require("../utils/pokeMove");
const movePp = require("../utils/movePp");

class MoveService {

  static async filterMoves(inputMoves){
    
    let combinedMoves = [];
    const fullList = inputMoves.map(m => m.pokemonMoves);

    fullList.forEach(element => {
      let newSplitedMoves = element.split(',');
      let clenedMoves = newSplitedMoves.map(i => i.trim());
      combinedMoves = combinedMoves.concat(clenedMoves);
    
    });

    return combinedMoves;

  }

  static async moveListByLevel(fulldata) {

    const existingMoves = await MoveModel.findPokemonMoveByName(fulldata);

    if (!existingMoves || existingMoves.length === 0) {

      const pokemonId = await PokemonModel.findPokemonIdByName(fulldata);
      const getedMoves = await pokeMove(fulldata);

      for (const element of getedMoves) {
        const { pokemonMoves, pokemonLevel } = element;
        const result = await MoveModel.addPokemonMove({ pokemonId, pokemonMoves, pokemonLevel});
        result === 1;
      };
      const moveByLevel = await MoveModel.findPokemonMoveByLevel(fulldata);
      return this.filterMoves(moveByLevel);

    } else {
      const moveByLevel = await MoveModel.findPokemonMoveByLevel(fulldata);
      return this.filterMoves(moveByLevel);

    }
    
  }

  static async setAttackConfig(fulldata) {

    let moveWithPp = []
    let { moveList } = fulldata;
    const arrayMoves = moveList.split(',');
    
    for ( const element of arrayMoves ) {
      const movePpPower = await movePp(element.trim());
      moveWithPp.push(`${element.trim()}|${movePpPower}`);
    }

    fulldata['moveList'] = moveWithPp.join(',');
    return MoveModel.setAttackConfig(fulldata);
  }

}

module.exports = MoveService;
