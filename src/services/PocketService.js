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

  static async allInThePocket(fulldata) {
    return await PocketModel.allInThePocket(fulldata);
  }

  static async freeSlotInThePocket(fulldata) {
    const vacancySlots = await checkSlots(fulldata);
    return vacancySlots.length
  }
  
  static async moveToOtherPocket(fulldata) {

    const { destinationPocket, trainerName, slotNumber } = fulldata;

    const oldPocketName = fulldata["pocketName"];
    const pocketName = destinationPocket;
    
    const newPocketId = await PocketModel.findPocketIdByName({pocketName, trainerName});
    const freeSlots = await this.freeSlotInThePocket({pocketName, trainerName});

    if (freeSlots && freeSlots > 0) {
      return await PocketModel.moveToOtherPocket({newPocketId, trainerName, oldPocketName, slotNumber})
    }
  }

  static async addInThePocketSlot(fulldata) {
    const { trainerName, pocketName, pokemonName } = fulldata;

    const pocketId = await PocketModel.findPocketIdByName({
      pocketName,
      trainerName,
    });
    const pokemonId = await PokemonModel.findPokemonIdByName({ pokemonName });
    const trainerId = await TrainerModel.findTrainerIdByName({ trainerName });
    const stateId = 1; // o estado padrão é normal(id=1)

    const vacancySlots = await checkSlots(fulldata);
    const slotNumber = vacancySlots[0];

    let slotData = { pocketId, trainerId, slotNumber, pokemonId, stateId };

    if (vacancySlots && vacancySlots.length > 0) {
      const result = await PocketModel.addInThePocketSlot(slotData);
      return result === 1;
    } else {
      return false;
    }
  }

  static async delInThePocketSlot(fulldata) {
    const vacancySlots = await checkSlots(fulldata);

    if (vacancySlots && vacancySlots.length < 6) {
      const result = await PocketModel.delInThePocketSlot(fulldata);
      return result === 1;
    } else {
      return false;
    }
  }
}

module.exports = PocketService;
