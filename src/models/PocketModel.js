const db = require("../config/Database");

//+-----------+------------+-------------+------------+---------------+
//| pocket_id | trainer_id | slot_number | pokemon_id | pokemon_state |
//+-----------+------------+-------------+------------+---------------+
class PocketModel {
  static async allPockets(fulldata) {
    const { trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        pocket.name as pocket_name
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
        pocket_content.slot_number as slot_number,
        pokemon.name as pokemon_name,
        pokemon_state.name as pokemon_state
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

  //   static async getTotalUsedSlots(trainerId, pocketId) {
  //     const [rows] = await db.query(
  //       "SELECT slot_number FROM pocket_content WHERE trainer_id = ? AND pocket_id = ?",
  //       [trainerId, pocketId]
  //     );
  //     return rows
  //   }

  //   static async populateSlotData(fulldata) {

  //     const { pocket_id, trainer_id, slot_number, pokemon_id, pokemon_state } = fulldata;
  //     const result = await db.query(
  //       "INSERT INTO pocket_content values (?, ?, ?, ?, ?)",
  //       [pocket_id, trainer_id, slot_number, pokemon_id, pokemon_state]
  //     );
  //     return result.affectedRows

  //   }

  //   static async populatePokemon(fulldata) {
  //     const {pokemon_id, name} = fulldata;
  //     const result = await db.query (
  //       "INSERT INTO pokemon values (?, ?)",
  //       [pokemon_id, name]
  //     );
  //     return result.affectedRows;

  //   }

  //   static async populateBasicInfoData(fulldata) {
  //     const {pokemon_id, height, weight, base_exp} = fulldata;
  //     const result = await db.query(
  //       "INSERT INTO pokemon_base_info values (?, ?, ?, ?)",
  //       [pokemon_id, height, weight, base_exp]
  //     )
  //     return result.affectedRows

  //   }
}

module.exports = PocketModel;
