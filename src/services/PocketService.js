const PocketModel = require("../models/PocketModel");

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

  // static async insertIntoNewSlot(callPocket) {

  //   const trainerId = callPocket.trainerId;
  //   const pocketId = callPocket.pocketId;
  //   const pokemonName = callPocket.pokemonName;
  //   const defaultState = 1; // o estado padrão é normal(id=1)

  //   const brute_slots = await PocketModel.getTotalUsedSlots(trainerId, pocketId);
  //   const basicInfo = await pokeBasicInfo(pokemonName);

  //   const possibleSlots = [1, 2, 3, 4, 5, 6]
  //   const usedSlots = brute_slots.map(item => item.slot_number);
  //   const vacancySlots = possibleSlots.filter(slot => !usedSlots.includes(slot));

  //   try {

  //     if (vacancySlots.length > 0) {

  //       try {

  //         await PocketModel.populatePokemon(basicInfo);
  //         await PocketModel.populateBasicInfoData(basicInfo);

  //         try {

  //           let slotData = {
  //             "pocket_id": pocketId,
  //             "trainer_id": trainerId,
  //             "slot_number": vacancySlots[0],
  //             "pokemon_id": basicInfo['pokemon_id'],
  //             "pokemon_state": defaultState,
  //           }

  //           PocketModel.populateSlotData(slotData);

  //         } catch (error) {
  //           throw new Error(error.message);
  //         }

  //       } catch (error) {
  //         throw new Error(error.message);
  //       }

  //     } else {
  //       throw new Error("Seu bolso já esstá cheio de pekemons!");
  //     }

  //   } catch (error) {
  //     throw new Error(error.message);
  //   }

  // }
}

module.exports = PocketService;
