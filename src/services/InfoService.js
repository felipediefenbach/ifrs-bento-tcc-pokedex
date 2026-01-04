const InfoModel = require("../models/InfoModel");
const pokeBasicInfo = require("../utils/pokeBasicInfo");

class InfoService {
  static async basicInfo(fulldata) {

    const existingInfo = await InfoModel.findPokemonInfoByName(fulldata);

    if (existingInfo.length === 0) {
      const basicInfo = await pokeBasicInfo(fulldata);
      const basicInforesult = await InfoModel.addPokemonBasicInfo(basicInfo);
      return basicInforesult === 1 ? await InfoModel.findPokemonInfoByName(fulldata) : null;
    } else {
      return existingInfo
    }
  }
}

module.exports = InfoService;
