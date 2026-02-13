const db = require("../config/Database");

class BattleModel {

  static async loadAdversariesByCycle(fulldata) {
    const { battleCycle, trainerName, pocketName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pokemon.name AS pokemonName,
        PocketContents.slot_number AS slotNumber,
        PocketContents.level AS pokemonLevel, 
        PocketContents.curr_xp AS pokemonCurrXp, 
        PocketContents.curr_hp AS pokemonCurrHp, 
        PocketContents.full_hp AS pokemonFullHp, 
        PocketContents.attack AS pokemonAttack, 
        PocketContents.defense AS pokemonDefense, 
        PocketContents.moves AS pokemonMoves,
        PocketContents.rm_moves AS pokemonRmMoves
      FROM PocketContents
      INNER JOIN pocket ON PocketContents.pocket_id = pocket.id
      INNER JOIN trainer ON PocketContents.trainer_id = trainer.id
      INNER JOIN pokemon ON PocketContents.pokemon_id = pokemon.id
      WHERE 
        PocketContents.slot_number = ?
        AND trainer.name = ?
        AND pocket.name = ?`,
      [battleCycle, trainerName, pocketName]
    );
    return rows[0];
  }

  static async checkFirstCombatblePokemons(fulldata) {
    const { trainerName, pocketName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        PocketContents.slot_number AS slotNumber,
        PocketContents.curr_hp AS pokemonCurrHp,
        trainer.name AS trainerName
      FROM PocketContents
      INNER JOIN pocket ON PocketContents.pocket_id = pocket.id
      INNER JOIN trainer ON PocketContents.trainer_id = trainer.id
      WHERE 
        trainer.name = ?
        AND pocket.name = ?
      ORDER BY
        PocketContents.slot_number ASC`,
      [trainerName, pocketName]
    );
    return rows;
  }

  static async updWinner(fulldata) {
    const {remainingHp, gainedXp, trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `UPDATE PocketContents AS pocket_content
        JOIN pocket ON PocketContents.pocket_id = pocket.id
        JOIN trainer ON PocketContents.trainer_id = trainer.id
        SET 
          PocketContents.curr_hp = ?,
          PocketContents.curr_xp = PocketContents.curr_xp + ?
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND PocketContents.slot_number = ?`,
        [remainingHp, gainedXp, trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;

  }

  static async getWinnerLevelUpStats(fulldata) {
    const {trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `SELECT 
          PocketContents.full_hp AS pokemonFullHp,
          PocketContents.attack AS pokemonAttack,
          PocketContents.defense AS pokemonDefense
        FROM PocketContents
        JOIN pocket ON PocketContents.pocket_id = pocket.id
        JOIN trainer ON PocketContents.trainer_id = trainer.id
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND PocketContents.slot_number = ?`,
        [trainerName, pocketName, slotNumber]
    );
    return rows[0];

  }

  static async updWinnerLevel(fulldata) {
    const {newHp, newAttack, newDefense, pokemonLevel, pokemonCurrXp, trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `UPDATE PocketContents AS pocket_content
        JOIN pocket ON PocketContents.pocket_id = pocket.id
        JOIN trainer ON PocketContents.trainer_id = trainer.id
        SET
          PocketContents.curr_hp = PocketContents.curr_hp + ?,
          PocketContents.full_hp = PocketContents.full_hp + ?,
          PocketContents.attack = PocketContents.attack + ?,
          PocketContents.defense = PocketContents.defense + ?,
          PocketContents.level = ?,
          PocketContents.curr_xp = ?
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND PocketContents.slot_number = ?`,
        [newHp, newHp, newAttack, newDefense, pokemonLevel, pokemonCurrXp, trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;
    
  }

  static async updLoser(fulldata) {
    const {trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `UPDATE PocketContents AS pocket_content
        JOIN pocket ON PocketContents.pocket_id = pocket.id
        JOIN trainer ON PocketContents.trainer_id = trainer.id
        SET 
          PocketContents.curr_hp = 0
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND PocketContents.slot_number = ?`,
        [trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;

  }

}

module.exports = BattleModel;
