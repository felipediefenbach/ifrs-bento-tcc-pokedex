const InfoService = require("../services/InfoService");

class InfoController {
  static async basicInfo(req, res) {
    try {
      const pokemonName = req.params.pokemonName;
      const basicInfo = await InfoService.basicInfo({pokemonName});
      res.json(basicInfo[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = InfoController;
