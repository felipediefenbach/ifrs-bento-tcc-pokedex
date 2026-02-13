const db = require("../config/Database");

class BattleModel {

  static async loadAdversariesByCycle(fulldata) {
    const { battleCycle, trainerName, pocketName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pokemon.name AS pokemonName,
        pocket_content.slot_number AS slotNumber,
        pocket_content.level AS pokemonLevel, 
        pocket_content.curr_xp AS pokemonCurrXp, 
        pocket_content.curr_hp AS pokemonCurrHp, 
        pocket_content.full_hp AS pokemonFullHp, 
        pocket_content.attack AS pokemonAttack, 
        pocket_content.defense AS pokemonDefense, 
        pocket_content.moves AS pokemonMoves,
        pocket_content.rm_moves AS pokemonRmMoves
      FROM pocket_content
      INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
      INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
      INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
      WHERE 
        pocket_content.slot_number = ?
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
        pocket_content.slot_number AS slotNumber,
        pocket_content.curr_hp AS pokemonCurrHp,
        trainer.name AS trainerName
      FROM pocket_content
      INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
      INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
      WHERE 
        trainer.name = ?
        AND pocket.name = ?
      ORDER BY
        pocket_content.slot_number ASC`,
      [trainerName, pocketName]
    );
    return rows;
  }

  static async updWinner(fulldata) {
    const {remainingHp, gainedXp, trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `UPDATE pocket_content AS pocket_content
        JOIN pocket ON pocket_content.pocket_id = pocket.id
        JOIN trainer ON pocket_content.trainer_id = trainer.id
        SET 
          pocket_content.curr_hp = ?,
          pocket_content.curr_xp = pocket_content.curr_xp + ?
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND pocket_content.slot_number = ?`,
        [remainingHp, gainedXp, trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;

  }

  static async getWinnerLevelUpStats(fulldata) {
    const {trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `SELECT 
          pocket_content.full_hp AS pokemonFullHp,
          pocket_content.attack AS pokemonAttack,
          pocket_content.defense AS pokemonDefense
        FROM pocket_content
        JOIN pocket ON pocket_content.pocket_id = pocket.id
        JOIN trainer ON pocket_content.trainer_id = trainer.id
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND pocket_content.slot_number = ?`,
        [trainerName, pocketName, slotNumber]
    );
    return rows[0];

  }

  static async updWinnerLevel(fulldata) {
    const {newHp, newAttack, newDefense, pokemonLevel, pokemonCurrXp, trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `UPDATE pocket_content AS pocket_content
        JOIN pocket ON pocket_content.pocket_id = pocket.id
        JOIN trainer ON pocket_content.trainer_id = trainer.id
        SET
          pocket_content.curr_hp = pocket_content.curr_hp + ?,
          pocket_content.full_hp = pocket_content.full_hp + ?,
          pocket_content.attack = pocket_content.attack + ?,
          pocket_content.defense = pocket_content.defense + ?,
          pocket_content.level = ?,
          pocket_content.curr_xp = ?
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND pocket_content.slot_number = ?`,
        [newHp, newHp, newAttack, newDefense, pokemonLevel, pokemonCurrXp, trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;
    
  }

  static async updLoser(fulldata) {
    const {trainerName, pocketName, slotNumber} = fulldata;
    const [rows] = await db.query(
      `UPDATE pocket_content AS pocket_content
        JOIN pocket ON pocket_content.pocket_id = pocket.id
        JOIN trainer ON pocket_content.trainer_id = trainer.id
        SET 
          pocket_content.curr_hp = 0
        WHERE 
          trainer.name = ?
          AND pocket.name = ?
          AND pocket_content.slot_number = ?`,
        [trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;

  }

}

module.exports = BattleModel;
