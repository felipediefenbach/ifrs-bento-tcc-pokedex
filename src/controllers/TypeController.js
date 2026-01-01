const TypeService = require("../services/TypeService");

class TypeController {
  static async typeInfo(req, res) {
    try {
      const pokemonName = req.params.pokemonName;
      const typeInfo = await TypeService.typeInfo({pokemonName});
      res.json(typeInfo[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = TypeController;
