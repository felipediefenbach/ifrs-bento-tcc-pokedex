const express = require("express");

const PocketController = require("../controllers/PocketController");

const pocket = express.Router();

pocket.get("/list/:trainerName", PocketController.allPockets);
pocket.post("/create", PocketController.createPockets);
pocket.delete("/delete", PocketController.deletePockets);
pocket.get("/slots/:trainerName/:pocketName", PocketController.freeSlotInThePocket);
pocket.get("/content/:trainerName/:pocketName", PocketController.allInThePocket);
pocket.get("/moves/:trainerName/:pocketName/:slotNumber", PocketController.getConfigedMoves);
pocket.put("/moves/rm", PocketController.setDeletedMoves);
pocket.post("/pokemon/add", PocketController.addInThePocketSlot);
pocket.delete("/pokemon/del", PocketController.delInThePocketSlot);
pocket.put("/pokemon/rev", PocketController.reviveInThePocketSlot);
pocket.put("/pokemon/move", PocketController.moveToOtherPocket);

module.exports = pocket;
