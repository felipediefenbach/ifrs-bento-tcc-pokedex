const BattleService = require("../services/BattleService");

class BattleController {
  static async loadAdversaries(req, res) {
    try {
      const battleCycle = req.params.battleCycle;
      const trainerName = req.params.trainerName;
      const pocketName = req.params.pocketName;
      const battleInfo = await BattleService.loadAdversaries({battleCycle, trainerName, pocketName});
      res.json(battleInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = BattleController;
