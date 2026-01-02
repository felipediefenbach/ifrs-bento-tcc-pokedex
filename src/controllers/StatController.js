const StatService = require("../services/StatService");

class TypeController {
  static async statInfo(req, res) {
    try {
      const pokemonName = req.params.pokemonName;
      const evoInfo = await StatService.statInfo({pokemonName});
      res.json(evoInfo[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = TypeController;
