const BattleModel = require("../models/BattleModel");

class BattleService {

  static async checkFirstCombatblePokemons(fulldata) {
    return await BattleModel.checkFirstCombatblePokemons(fulldata);
  }

  static async loadAdversaries(fulldata) {
    
    const definitions = await BattleModel.loadAdversaries(fulldata);
    const { trainerName, pocketName } = fulldata;

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
    definitions['trainerName'] = trainerName;
    definitions['pocketName'] = pocketName;

    return definitions
    
  }

  static async loadAdversariesByCycle(fulldata) {
    
    const definitions = await BattleModel.loadAdversariesByCycle(fulldata);
    const { trainerName, pocketName } = fulldata;
    
    const moves = [];
    const { pokemonMoves } = definitions;
    const fullMoves = pokemonMoves.split(',');    definitions['trainerName'] = trainerName;
    definitions['pocketName'] = pocketName;
    
    for (let element of fullMoves ) {

      let hability = element.split('|');
      
      moves.push({
        moveName: hability[0],
        movePoints: parseInt(hability[1]),
        movePower: parseInt(hability[2])
      });

    }

    definitions['pokemonMoves'] = moves;
    definitions['trainerName'] = trainerName;
    definitions['pocketName'] = pocketName;

    return definitions
    
  }

  static async updLoser(fulldata) {
    const loser = await BattleModel.updLoser(fulldata);
    return loser === 1
  }

  static async updWinner(fulldata) {
    const winner = await BattleModel.updWinner(fulldata);
    return winner === 1
  }

}

module.exports = BattleService;
