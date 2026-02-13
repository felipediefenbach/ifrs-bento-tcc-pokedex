const db = require("../config/Database");

class PocketModel {

  static async allPockets(fulldata) {
    const { trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        Pockets.name AS pocket_name
      FROM Pockets
      INNER JOIN trainer ON Pockets.trainer_id = trainer.id
      WHERE trainer.name = ?`,
      [trainerName]
    );
    return rows;
    
  }

    static async allPockets(fulldata) {
    const { trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        Pockets.name AS pocket_name
      FROM Pockets
      INNER JOIN trainer ON Pockets.trainer_id = trainer.id
      WHERE trainer.name = ?`,
      [trainerName]
    );
    return rows;
    
  }
  
  static async createPockets(fulldata) {
    const { trainerId, PocketsName } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO Pockets (trainer_id, name)
        VALUES (?, ?)`,
      [trainerId, PocketsName]
    );
    return rows.affectedRows;
    
  }

  static async deletePockets(fulldata) {
    const { trainerId, PocketsName } = fulldata;
    const [rows] = await db.query(
      `DELETE FROM Pockets
        WHERE 
          trainer_id = ?
          AND name = ?`,
      [trainerId, PocketsName]
    );
    return rows.affectedRows;
    
  }

  static async allInThePocket(fulldata) {
    const { trainerName, PocketsName } = fulldata;
    const [rows] = await db.query(
      `SELECT
          Pockets.name AS PocketsName,
          trainer.name AS trainerName,
          pokemon.name AS pokemonName,
          PocketContents.slot_number AS slotNumber,
          PocketContents.curr_hp AS pokemonCurrHp,
          PocketContents.full_hp AS pokemonFullHp,
          PocketContents.level AS pokemonLevel
        FROM PocketContents
        INNER JOIN Pockets ON PocketContents.Pockets_id = Pockets.id
        INNER JOIN trainer ON PocketContents.trainer_id = trainer.id
        INNER JOIN pokemon ON PocketContents.pokemon_id = pokemon.id
        WHERE 
          trainer.name = ?
          AND Pockets.name = ?
        ORDER BY PocketContents.slot_number ASC`,
      [trainerName, PocketsName]
    );
    return rows;
    
  }

  static async findPocketIdByName(fulldata) {
    const { PocketsName, trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
      Pockets.id AS PocketsId
    FROM Pockets
    INNER JOIN trainer ON Pockets.trainer_id = trainer.id
    WHERE
      Pockets.name = ?
      AND trainer.name = ?`,
      [PocketsName, trainerName]
    );
    return rows[0];

  }

  static async getUsedSlots(fulldata) {
    const { trainerName, PocketsName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        PocketContents.slot_number AS slot_number
      FROM PocketContents
      INNER JOIN Pockets ON PocketContents.Pockets_id = Pockets.id
      INNER JOIN trainer ON PocketContents.trainer_id = trainer.id
      WHERE 
        trainer.name = ?
        AND Pockets.name = ?`,
      [trainerName, PocketsName]
    );
    return rows;

  }

  static async getConfigedMoves(fulldata) {
    const { trainerName, PocketsName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `SELECT
        PocketContents.moves AS pokemonMoves
      FROM PocketContents
      INNER JOIN Pockets ON PocketContents.Pockets_id = Pockets.id
      INNER JOIN trainer ON PocketContents.trainer_id = trainer.id
      WHERE 
        trainer.name = ?
        AND Pockets.name = ?
        AND PocketContents.slot_number = ?`,
      [trainerName, PocketsName, slotNumber]
    );
    return rows[0];

  }

  static async addInThePocketSlot(fulldata) {
    const { PocketsId, trainerId, slotNumber, pokemonId } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO PocketContents (Pockets_id, trainer_id, slot_number, pokemon_id)
        VALUES (?, ?, ?, ?)`,
      [PocketsId, trainerId, slotNumber, pokemonId]
    );
    return rows.affectedRows;

  }

  static async moveToOtherPocket(fulldata) {
    const { newPocketId, trainerName, oldPocketName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `UPDATE PocketContents AS PocketContents
        JOIN Pockets ON PocketContents.Pockets_id = Pockets.id
        JOIN trainer ON PocketContents.trainer_id = trainer.id
        SET PocketContents.Pockets_id = ?
        WHERE 
          trainer.name = ?
          AND Pockets.name = ?
          AND PocketContents.slot_number = ?`,
      [newPocketId, trainerName, oldPocketName, slotNumber]
    );
    return rows.affectedRows

  }

  static async setDeletedMoves(fulldata) {
    const { moveList, trainerName, PocketsName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `UPDATE PocketContents AS PocketContents
        JOIN Pockets ON PocketContents.Pockets_id = Pockets.id
        JOIN trainer ON PocketContents.trainer_id = trainer.id
        SET PocketContents.rm_moves = ?
        WHERE 
          trainer.name = ?
          AND Pockets.name = ?
          AND PocketContents.slot_number = ?`,
      [ moveList, trainerName, PocketsName, slotNumber ]
    );
    return rows.affectedRows

  }

  // Insert incial no PocketContents
  // Com o passar do tempo os dados do PocketContents mudam 
  // Conforme o pokemon batalha e evolui
  static async setPocketPokemonBaseStats(fulldata) {
    const { PocketsId, trainerId, slotNumber, pokemonId } = fulldata;

    const [rows] = await db.query(
      `UPDATE PocketContents AS PocketContents
        INNER JOIN pokemon_base_info ON PocketContents.pokemon_id = pokemon_base_info.pokemon_id
        INNER JOIN pokemon_stat ON PocketContents.pokemon_id = pokemon_stat.pokemon_id
        SET
          PocketContents.curr_xp = pokemon_base_info.base_exp,
          PocketContents.curr_hp = pokemon_stat.hp,
          PocketContents.full_hp = pokemon_stat.hp,
          PocketContents.attack = pokemon_stat.attack,
          PocketContents.defense = pokemon_stat.defense
        WHERE
          PocketContents.Pockets_id = ?
          AND PocketContents.trainer_id = ?
          AND PocketContents.slot_number = ?
          AND PocketContents.pokemon_id = ?`,
      [ PocketsId, trainerId, slotNumber, pokemonId ]
    );
    return rows.affectedRows;

  }

  static async reviveInThePocketSlot(fulldata) {
    const { trainerName, PocketsName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `UPDATE PocketContents AS PocketContents
        JOIN Pockets ON PocketContents.Pockets_id = Pockets.id
        JOIN trainer ON PocketContents.trainer_id = trainer.id
        SET 
          PocketContents.curr_hp = PocketContents.full_hp
        WHERE 
          trainer.name = ?
          AND Pockets.name = ?
          AND PocketContents.slot_number = ?`,
      [trainerName, PocketsName, slotNumber]
    );
    return rows.affectedRows;

  }

  static async delInThePocketSlot(fulldata) {
    const { trainerName, PocketsName, slotNumber } = fulldata;
    const [rows] = await db.query(
      `DELETE PocketContents
        FROM PocketContents AS PocketContents
        INNER JOIN Pockets ON PocketContents.Pockets_id = Pockets.id
        INNER JOIN trainer ON PocketContents.trainer_id = trainer.id
        WHERE 
          trainer.name = ?
          AND Pockets.name = ?
          AND PocketContents.slot_number = ?`,
      [trainerName, PocketsName, slotNumber]
    );
    return rows.affectedRows;

  }

}

module.exports = PocketModel;
