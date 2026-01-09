const db = require("../config/Database");

class MoveModel {

  static async findPokemonMoveByName(fulldata) {
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT
          pokemon_move.moves AS moves,
          pokemon_move.level AS level
        FROM pokemon_move
        INNER JOIN pokemon ON pokemon_move.pokemon_id = pokemon.id
        WHERE
          pokemon.name = ?`,
      [pokemonName]
    );
    return rows;
  }

  static async findPokemonMoveByLevel(fulldata) {
    const { pokemonName, pokemonLevel } = fulldata;
    const [rows] = await db.query(
      `SELECT
          pokemon_move.moves AS pokemonMoves
        FROM pokemon_move
        INNER JOIN pokemon ON pokemon_move.pokemon_id = pokemon.id
        WHERE
          pokemon.name = ?
          AND pokemon_move.level = ?`,
      [pokemonName, pokemonLevel]
    );
    return rows;
  }

  static async addPokemonMove(fulldata) {
    const { pokemonId, pokemonLevel, pokemonMoves } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pokemon_move 
        VALUES (?, ?, ?)`,
      [pokemonId, pokemonLevel, pokemonMoves]
    );
    return rows.affectedRows;
  }

  static async setAttackConfig(fulldata) {
    const { moveList, trainerName, pocketName, slotNumber } = fulldata
    const [rows] = await db.query(
    `UPDATE pocket_content AS pocket_content
      JOIN pocket ON pocket_content.pocket_id = pocket.id
      JOIN trainer ON pocket_content.trainer_id = trainer.id
      SET pocket_content.moves = ?
      WHERE 
        trainer.name = ?
        AND pocket.name = ?
        AND pocket_content.slot_number = ?`,
    [moveList, trainerName, pocketName, slotNumber]
    );
    return rows.affectedRows;
  }
}

module.exports = MoveModel;
