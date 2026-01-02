const db = require("../config/Database");

class EvoModel {

  static async findPokemonStatByName(fulldata) {
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT
        pokemon_stat.hp AS hp,
        pokemon_stat.attack AS attack,
        pokemon_stat.defense AS defense,
        pokemon_stat.sattack AS sattack,
        pokemon_stat.sdefense AS sdefense,
        pokemon_stat.speed AS speed
      FROM pokemon_stat
      INNER JOIN pokemon ON pokemon_stat.pokemon_id = pokemon.id
      WHERE
        pokemon.name = ?`,
      [pokemonName]
    );
    return rows;
  }

  static async addPokemonStat(fulldata) {
    const { pokemonId, pokemonHp, pokemonAttack, pokemonDefense, pokemonSattack, pokemonSdefense, pokemonSpeed } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pokemon_stat 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [pokemonId, pokemonHp, pokemonAttack, pokemonDefense, pokemonSattack, pokemonSdefense, pokemonSpeed]
    );

    return rows.affectedRows;
  }
}

module.exports = EvoModel;
