const PocketService = require("../services/PocketService");

class PocketController {

  static async allPockets(req, res) {
    try {
      const trainerName = req.params.trainerName;
      const result = await PocketService.allPockets({ trainerName });
      if (result.length > 0) {
        res.status(200).json({
          result: result,
          status: true,
        });
      } else {
        res.status(200).json({
          result: "The pocket is empty ?!",
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async checkFirstCombatblePokemons(req, res) {  
    try {
      const trainerName = req.params.trainerName;
      const pocketName = req.params.pocketName;
      const result = await PocketService.allPockets({ trainerName, pocketName });
      if (result.length > 0) {
        res.status(200).json({
          result: result,
          status: true,
        });
      } else {
        res.status(200).json({
          result: "The pocket is empty ?!",
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async moveToOtherPocket(req, res) {
    try {
      const result = await PocketService.moveToOtherPocket(req.body);
      if (result > 0) {
        res.status(200).json({
          result: "Pokemon Moved with success !!",
          status: true,
        });
      } else {
        res.status(200).json({
          result: "Problem to move pokemon !!",
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async freeSlotInThePocket(req, res) {
    const trainerName = req.params.trainerName;
    const pocketName = req.params.pocketName;
    try {
      const numberOfFreeSlots = await PocketService.freeSlotInThePocket({
        trainerName,
        pocketName,
      });
      if (numberOfFreeSlots > 0) {
        res.status(200).json({
          result: numberOfFreeSlots,
          status: true,
        });
      } else {
        res.status(200).json({
          result: numberOfFreeSlots,
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async allInThePocket(req, res) {
    const trainerName = req.params.trainerName;
    const pocketName = req.params.pocketName;
    try {
      const slots = await PocketService.allInThePocket({
        trainerName,
        pocketName,
      });
      if (slots.length > 0) {
        res.status(200).json({
          result: slots,
          status: true,
        });
      } else {
        res.status(200).json({
          result: slots,
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getConfigedMoves(req, res) {
    const trainerName = req.params.trainerName;
    const pocketName = req.params.pocketName;
    const slotNumber = req.params.slotNumber;
    try {
      const moves = await PocketService.getConfigedMoves({
        trainerName,
        pocketName,
        slotNumber
      });
      if (moves.length > 0) {
        res.status(200).json({
          result: moves,
          status: true,
        });
      } else {
        res.status(200).json({
          result: moves,
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addInThePocketSlot(req, res) {
    try {
      const result = await PocketService.addInThePocketSlot(req.body);
      if (result) {
        res.status(200).json({
          result: "Pokemon added to the pocket !!",
          status: true,
        });
      } else {
        res.status(200).json({
          result: "The pocket is full !!",
          status: false,
        });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }

  static async reviveInThePocketSlot(req, res) {
    try {
      const result = await PocketService.reviveInThePocketSlot(req.body);
      if (result === 1) {
        res.status(200).json({
          result: "Pokemon revived !!",
          status: true,
        });
      } else {
        res.status(200).json({
          result: "Problem to revive this pokemon !!",
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delInThePocketSlot(req, res) {
    try {
      const result = await PocketService.delInThePocketSlot(req.body);
      if (result === 1) {
        res.status(200).json({
          result: "Pokemon removed !!",
          status: true,
        });
      } else {
        res.status(200).json({
          result: "Problem to remove this pokemon !!",
          status: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PocketController;
