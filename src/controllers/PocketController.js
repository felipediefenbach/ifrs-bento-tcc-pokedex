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
    try {
      const slots = await PocketService.allInThePocket(req.body);
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

  // static async insertPokemonInSlot(req, res) {
  //   try {
  //     await PocketService.insertIntoNewSlot(req.body);
  //   } catch {
  //     res.status(500).json({ error: error.message });      
  //   }
  // }
}


module.exports = PocketController;
