const PocketModel = require("../models/PocketModel");

async function checkSlots(fulldata) {
  const { trainerName, pocketName } = fulldata;
  const possibleSlots = [1, 2, 3, 4, 5, 6];
  const brute_slots = await PocketModel.getUsedSlots({
    trainerName,
    pocketName,
  });
  const usedSlots = brute_slots.map((item) => item.slot_number);
  const vacancySlots = possibleSlots.filter(
    (slot) => !usedSlots.includes(slot)
  );

  return vacancySlots
}

module.exports = checkSlots;
