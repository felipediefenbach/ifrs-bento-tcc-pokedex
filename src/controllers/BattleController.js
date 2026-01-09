const BattleService = require("../services/BattleService");

class BattleController {
  
  static async loadAdversaries(req, res) {
    try {
      const trainerName = req.params.trainerName;
      const pocketName = req.params.pocketName;
      const result = await BattleService.loadAdversaries({trainerName, pocketName});
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async checkFirstCombatblePokemons(req, res) {
    try {
      const trainerName = req.params.trainerName;
      const pocketName = req.params.pocketName;
      const result = await BattleService.checkFirstCombatblePokemons({trainerName, pocketName});
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async loadAdversariesByCycle(req, res) {
    try {
      const trainerName = req.params.trainerName;
      const pocketName = req.params.pocketName;
      const battleCycle = req.params.battleCycle;
      const result = await BattleService.loadAdversariesByCycle({battleCycle, trainerName, pocketName});
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updLoser(req, res) {
    try {
      const result = await BattleService.updLoser(req.body);
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

  static async updWinner(req, res) {
    try {
      const result = await BattleService.updWinner(req.body);
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

module.exports = BattleController;
