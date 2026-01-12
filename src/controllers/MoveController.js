const MoveService = require("../services/MoveService");

class MoveController {

  static async moveListByLevel(req, res) {
    try {
      const pokemonName = req.params.pokemonName;
      const pokemonLevel = req.params.pokemonLevel;
      const result = await MoveService.moveListByLevel({pokemonName, pokemonLevel});
      if (result.length > 0) {
        res.status(200).json({
          result: result,
          status: true,
        });
      } else {
        res.status(200).json({
          result: result,
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async setAttackConfig(req, res) {
    try {
      const result = await MoveService.setAttackConfig(req.body);
      if (result > 0) {
        res.status(200).json({
          result: result,
          status: true,
        });
      } else {
        res.status(200).json({
          result: result,
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = MoveController;
