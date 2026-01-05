const BattleService = require("../services/BattleService");

class BattleController {
  static async loadAdversaries(req, res) {
    try {
      const battleCycle = req.params.cycle;
      const trainerName = req.params.trainerName;
      const pocketName = req.params.pocketName;
      const battleInfo = await BattleService.loadAdversaries({battleCycle, battlePlayer});
      res.json(battleInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = BattleController;
