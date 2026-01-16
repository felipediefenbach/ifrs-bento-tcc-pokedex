const PocketModel = require("../models/PocketModel");
const PokemonModel = require("../models/PokemonModel");
const TrainerModel = require("../models/TrainerModel");
const checkSlots = require("../utils/checkSlots");

class PocketService {

  static async allPockets(fulldata) {
    let names = [];

    const pockets = await PocketModel.allPockets(fulldata);

    pockets.forEach((element) => {
      const { pocket_name } = element;
      names.push(pocket_name);
    });
    return names;
  
  }

  static async createPockets(fulldata) {
    const { trainerName, pocketName } = fulldata;

    const pocketExists = await PocketModel.findPocketIdByName(fulldata);

    if (pocketExists) {
      return false
    
    } else {
      const trainerId = await TrainerModel.findTrainerIdByName({ trainerName });
      const result = await PocketModel.createPockets({trainerId, pocketName});
      return result === 1;

    }
  
  }

  static async deletePockets(fulldata) {
    const { trainerName, pocketName } = fulldata;
  
    const pocketExists = await PocketModel.findPocketIdByName(fulldata);

    if (pocketExists) {
      const trainerId = await TrainerModel.findTrainerIdByName({ trainerName });
      const result = await PocketModel.deletePockets({trainerId, pocketName});  
      return result === 1;
    
    } else {
      return false
    
    }
  }

  static async allInThePocket(fulldata) {
    return await PocketModel.allInThePocket(fulldata);
  
  }

  static async getConfigedMoves(fulldata) {
    const config = await PocketModel.getConfigedMoves(fulldata);
    const { pokemonMoves } = config;
    return pokemonMoves;

  }

  static async freeSlotInThePocket(fulldata) {
    const vacancySlots = await checkSlots(fulldata);
    return vacancySlots.length;

  }
  
  static async moveToOtherPocket(fulldata) {

    const { destinationPocket, trainerName, slotNumber } = fulldata;

    const oldPocketName = fulldata["pocketName"];
    const pocketName = destinationPocket;
    
    const findedPocket = await PocketModel.findPocketIdByName({pocketName, trainerName});
    const newPocketId = findedPocket['pocketId'];
    const freeSlots = await this.freeSlotInThePocket({pocketName, trainerName});

    if (freeSlots && freeSlots > 0) {
      return await PocketModel.moveToOtherPocket({newPocketId, trainerName, oldPocketName, slotNumber});
  
    }
  
  }

  static async addInThePocketSlot(fulldata) {
    const { trainerName, pocketName, pokemonName } = fulldata;

    const findedPocket = await PocketModel.findPocketIdByName({ pocketName, trainerName });
    const pocketId = findedPocket['pocketId'];
    const pokemonId = await PokemonModel.findPokemonIdByName({ pokemonName });
    const trainerId = await TrainerModel.findTrainerIdByName({ trainerName });

    const vacancySlots = await checkSlots(fulldata);
    const slotNumber = vacancySlots[0];

    let slotData = { pocketId, trainerId, slotNumber, pokemonId };

    if (vacancySlots && vacancySlots.length > 0) {
      const resultAdd = await PocketModel.addInThePocketSlot(slotData);
      const resultStat = await PocketModel.setPocketPokemonBaseStats({pocketId, trainerId, slotNumber, pokemonId});
      return resultAdd  === 1 && resultStat === 1;
    
    }
  }

  static async reviveInThePocketSlot(fulldata) {
    return await PocketModel.reviveInThePocketSlot(fulldata);

  }

  static async delInThePocketSlot(fulldata) {
    return await PocketModel.delInThePocketSlot(fulldata);
  
  }

  static async setDeletedMoves(fulldata) {
    return await PocketModel.setDeletedMoves(fulldata);
  
  }

}

module.exports = PocketService;
