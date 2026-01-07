const db = require("../config/Database");

class BattleModel {

  static async getCyclePokemonBySlot(fulldata) {
    const { battleCycle, trainerName, pocketName } = fulldata;
    const [rows] = await db.query(
      `SELECT
          pokemon.name AS pokemonName,
          pocket_content.level AS pokemonLevel, 
          pocket_content.hp AS pokemonHp, 
          pokemon_state.name AS pokemonState,
          pocket_content.moves AS pokemonMoves
        FROM pocket_content
        INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
        INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
        INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
        INNER JOIN pokemon_state ON pocket_content.state_id = pokemon_state.id
        WHERE 
          pocket_content.slot_number = ?
          AND trainer.name = ?
          AND pocket.name = ?`,
      [battleCycle, trainerName, pocketName]
    );
    return rows[0];
  }

}

module.exports = BattleModel;
