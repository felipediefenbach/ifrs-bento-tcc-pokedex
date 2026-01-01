const db = require("../config/Database");

class InfoModel {

  static async findPokemonInfoByName(fulldata) {
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pokemon_base_info.base_exp AS base_exp,
        pokemon_base_info.height AS height,
        pokemon_base_info.weight AS weight
      FROM pokemon_base_info
      INNER JOIN pokemon ON pokemon_base_info.pokemon_id = pokemon.id
      WHERE 
        pokemon.name = ?`,
      [pokemonName]
    );
    return rows;
  }

  static async addPokemonBasicInfo(fulldata) {
    const { pokemonId, pokemonHeight, pokemonWeight, pokemonBaseExp } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pokemon_base_info 
        VALUES (?, ?, ?, ?)`,
      [pokemonId,pokemonHeight,pokemonWeight,pokemonBaseExp]
    );

    return rows.affectedRows;
  }
}

module.exports = InfoModel;
