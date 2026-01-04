const EvoService = require("../services/EvoService");

class EvoController {
  static async evoSequence(req, res) {
    try {
      const pokemonName = req.params.pokemonName;
      const evoInfo = await EvoService.evoSequence({pokemonName});
      res.json(evoInfo[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = EvoController;
