const PocketService = require("../services/PocketService");

class PocketController {

  static async allPockets(req, res) {
    try {
      const pockets = await PocketService.allPockets(req.body);
      res.status(200).json(
        {
          "result": pockets,
          "status": true,
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async allInThePocket(req, res) {
    const trainerName = req.params.trainerName; 
    const pocketName = req.params.pocketName; 
    try {
      const slots = await PocketService.allInThePocket({trainerName, pocketName});
      if (slots.length > 0) {
        res.status(200).json(
          {
            "result": slots,
            "status": true,
          }
        );     
      } else {
        res.status(200).json(
          {
            "result": slots,
            "status": false,
          }
        );
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addInThePocketSlot(req, res) {
    try {
      const result = await PocketService.addInThePocketSlot(req.body);
      if (result) {
        res.status(200).json(
          {
            "result": "Pokemon adicionado ao bolso",
            "status": true,
          }
        );
      } else {
        res.status(200).json(
          {
            "result": "O bolso já está cheio de pokemons",
            "status": false,
          }
        );
      }
    } catch {
      res.status(500).json({ error: error.message });      
    }
  }

    static async delInThePocketSlot(req, res) {
    try {
      const result = await PocketService.delInThePocketSlot(req.body);
      if (result) {
        res.status(200).json(
          {
            "result": "Pokemon removido com sucesso",
            "status": true,
          }
        );
      } else {
          res.status(200).json(
          {
            "result": "O Slot está vázio",
            "status": false,
          }
        );
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = PocketController;
