const express = require("express");

const PocketController = require("../controllers/PocketController");

const pocket = express.Router();

pocket.get("/list/:trainerName", PocketController.allPockets);
pocket.get("/slots/:trainerName/:pocketName", PocketController.freeSlotInThePocket);
pocket.get("/content/:trainerName/:pocketName", PocketController.allInThePocket);
pocket.post("/pokemon/add", PocketController.addInThePocketSlot);
pocket.delete("/pokemon/del", PocketController.delInThePocketSlot);
pocket.put("/pokemon/move", PocketController.moveToOtherPocket);

module.exports = pocket;
