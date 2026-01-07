const BattleModel = require("../models/BattleModel");

class BattleService {
  static async loadAdversaries(fulldata) {
    
    const definitions = await BattleModel.getCyclePokemonBySlot(fulldata);
    
    const moves = [];
    const { pokemonMoves } = definitions;
    const fullMoves = pokemonMoves.split(',');
    
    for (let element of fullMoves ) {

      let hability = element.split('|');
      
      moves.push({
        moveName: hability[0],
        movePoints: parseInt(hability[1]),
        movePower: parseInt(hability[2])
      });

    }

    definitions['pokemonMoves'] = moves;
    return definitions
    
  }
}

module.exports = BattleService;
