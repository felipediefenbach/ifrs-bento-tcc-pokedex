const db = require("../config/Database");

class EvoModel {

  static async findPokemonEvoByName(fulldata) {
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pokemon_evolution.evolutions
      FROM pokemon_evolution
      INNER JOIN pokemon ON pokemon_evolution.pokemon_id = pokemon.id
      WHERE
        pokemon.name = ?`,
      [pokemonName]
    );
    return rows;
  }

  static async addPokemonEvo(fulldata) {
    const { pokemonId, pokemonEvos } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pokemon_evolution 
        VALUES (?, ?)`,
      [pokemonId, pokemonEvos]
    );

    return rows.affectedRows;
  }
}

module.exports = EvoModel;
