const db = require("../config/Database");

class StatModel {

  static async findPokemonStatByName(fulldata) {
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pokemon_stat.hp AS hp,
        pokemon_stat.attack AS attack,
        pokemon_stat.defense AS defense
      FROM pokemon_stat
      INNER JOIN pokemon ON pokemon_stat.pokemon_id = pokemon.id
      WHERE
        pokemon.name = ?`,
      [pokemonName]
    );
    return rows;
  }

  static async addPokemonStat(fulldata) {
    const { pokemonId, pokemonHp, pokemonAttack, pokemonDefense } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pokemon_stat 
        VALUES (?, ?, ?, ?)`,
      [pokemonId, pokemonHp, pokemonAttack, pokemonDefense]
    );

    return rows.affectedRows;
  }
}

module.exports = StatModel;
