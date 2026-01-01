const db = require("../config/Database");

class InfoModel {

  static async findPokemonTypeByName(fulldata) {
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pokemon_type.type
      FROM pokemon_type
      INNER JOIN pokemon ON pokemon_type.pokemon_id = pokemon.id
      WHERE
        pokemon.name = ?`,
      [pokemonName]
    );
    return rows;
  }

  static async addPokemonType(fulldata) {
    const { pokemonId, pokemonTypes } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pokemon_type 
        VALUES (?, ?)`,
      [pokemonId, pokemonTypes]
    );

    return rows.affectedRows;
  }
}

module.exports = InfoModel;
