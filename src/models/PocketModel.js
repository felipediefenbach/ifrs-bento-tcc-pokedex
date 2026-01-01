const db = require("../config/Database");

class PocketModel {
  static async allPockets(fulldata) {
    const { trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        pocket.name AS pocket_name
      FROM pocket
      INNER JOIN trainer ON pocket.trainer_id = trainer.id
      WHERE trainer.name = ?`,
      [trainerName]
    );

    return rows;
  }

  static async allInThePocket(fulldata) {
    const { trainerName, pocketName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pocket_content.slot_number AS slot_number,
        pocket.name AS pocket_name,
        trainer.name AS trainer_name, 
        pokemon.name AS pokemon_name,
        pokemon_state.name AS pokemon_state
      FROM pocket_content
      INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
      INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
      INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
      INNER JOIN pokemon_state ON pocket_content.state_id = pokemon_state.id
      WHERE 
        trainer.name = ?
        AND pocket.name = ?`,
      [trainerName, pocketName]
    );

    return rows;
  }

  static async findPocketIdByName(fulldata) {
    const { pocketName, trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
      pocket.id AS pocket_id
    FROM pocket
    INNER JOIN trainer ON pocket.trainer_id = trainer.id
    WHERE
      pocket.name = ?
      AND trainer.name = ?`,
      [pocketName, trainerName]
    );

    return rows[0]["pocket_id"];
  }

  static async getUsedSlots(fulldata) {
    const { trainerName, pocketName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pocket_content.slot_number AS slot_number
      FROM pocket_content
      INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
      INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
      WHERE 
        trainer.name = ?
        AND pocket.name = ?`,
      [trainerName, pocketName]
    );

    return rows;
  }

  static async addInThePocketSlot(fulldata) {
    const { pocketId, trainerId, slotNumber, pokemonId, stateId } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pocket_content 
        VALUES (?, ?, ?, ?, ?)`,
      [pocketId, trainerId, slotNumber, pokemonId, stateId]
    );

    return rows.affectedRows;
  }

  static async delInThePocketSlot(fulldata) {
    const { trainerName, pocketName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `DELETE pocket_content
      FROM pocket_content AS pocket_content
      INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
      INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
      WHERE 
        trainer.name = ?
        AND pocket.name = ?
        AND pocket_content.slot_number = ?`,
      [trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;
  }
}

module.exports = PocketModel;
