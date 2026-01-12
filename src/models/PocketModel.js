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
          pocket.name AS pocketName,
          trainer.name AS trainerName,
          pokemon.name AS pokemonName,
          pocket_content.slot_number AS slotNumber,
          pocket_content.curr_hp AS pokemonCurrHp,
          pocket_content.full_hp AS pokemonFullHp,
          pocket_content.level AS pokemonLevel
        FROM pocket_content
        INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
        INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
        INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
        ORDER BY pocket_content.slot_number ASC`,
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

  static async getConfigedMoves(fulldata) {
    const { trainerName, pocketName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pocket_content.moves AS pokemonMoves
      FROM pocket_content
      INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
      INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
      WHERE 
        trainer.name = ?
        AND pocket.name = ?
        AND pocket_content.slot_number = ?`,
      [trainerName, pocketName, slotNumber]
    );
    return rows[0];

  }

  static async addInThePocketSlot(fulldata) {
    const { pocketId, trainerId, slotNumber, pokemonId } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pocket_content (pocket_id, trainer_id, slot_number, pokemon_id)
        VALUES (?, ?, ?, ?)`,
      [pocketId, trainerId, slotNumber, pokemonId]
    );
    return rows.affectedRows;

  }

  static async moveToOtherPocket(fulldata) {
    const { newPocketId, trainerName, oldPocketName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `UPDATE pocket_content AS pocket_content
        JOIN pocket ON pocket_content.pocket_id = pocket.id
        JOIN trainer ON pocket_content.trainer_id = trainer.id
        SET pocket_content.pocket_id = ?
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND pocket_content.slot_number = ?`,
      [newPocketId, trainerName, oldPocketName, slotNumber]
    );
    return rows.affectedRows

  }

  static async setDeletedMoves(fulldata) {
    const { moveList, trainerName, pocketName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `UPDATE pocket_content AS pocket_content
        JOIN pocket ON pocket_content.pocket_id = pocket.id
        JOIN trainer ON pocket_content.trainer_id = trainer.id
        SET pocket_content.rm_moves = ?
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND pocket_content.slot_number = ?`,
      [ moveList, trainerName, pocketName, slotNumber ]
    );
    return rows.affectedRows

  }

  // Insert incial no pocket_content
  // Com o passar do tempo os dados do pocket_content mudam 
  // Conforme o pokemon batalha e evolui
  static async setPocketPokemonBaseStats(fulldata) {
    const { pocketId, trainerId, slotNumber, pokemonId } = fulldata;

    const [rows] = await db.query(
      `UPDATE pocket_content AS pocket_content
        INNER JOIN pokemon_base_info ON pocket_content.pokemon_id = pokemon_base_info.pokemon_id
        INNER JOIN pokemon_stat ON pocket_content.pokemon_id = pokemon_stat.pokemon_id
        SET
          pocket_content.curr_xp = pokemon_base_info.base_exp,
          pocket_content.curr_hp = pokemon_stat.hp,
          pocket_content.full_hp = pokemon_stat.hp,
          pocket_content.attack = pokemon_stat.attack,
          pocket_content.defense = pokemon_stat.defense
        WHERE
          pocket_content.pocket_id = ?
          AND pocket_content.trainer_id = ?
          AND pocket_content.slot_number = ?
          AND pocket_content.pokemon_id = ?`,
      [ pocketId, trainerId, slotNumber, pokemonId ]
    );
    return rows.affectedRows;

  }

  static async reviveInThePocketSlot(fulldata) {
    const { trainerName, pocketName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `UPDATE pocket_content AS pocket_content
        JOIN pocket ON pocket_content.pocket_id = pocket.id
        JOIN trainer ON pocket_content.trainer_id = trainer.id
        SET 
          pocket_content.curr_hp = pocket_content.full_hp
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND pocket_content.slot_number = ?`,
      [trainerName, pocketName, slotNumber]
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
