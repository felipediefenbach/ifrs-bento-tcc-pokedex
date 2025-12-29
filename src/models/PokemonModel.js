const db = require("../config/Database");

class PokemonModel {

  static async allPokemonNames() {
    const [rows] = await db.query(
      `SELECT 
        name 
      FROM pokemon_names`
    );
    return rows;
  }

  static async findPokemonByName(fulldata){
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        name
      FROM pokemon 
      WHERE 
        name = ?`,
      [pokemonName]
    );
    return rows;
  }

  static async findPokemonIdByName(fulldata){
    const { pokemonName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        id 
      FROM pokemon
      WHERE 
        name = ?`,
      [pokemonName]
    );
    return rows[0]['id'];
  }

  static async addPokemon(fulldata) {
    const { pokemonId, pokemonName } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pokemon (id, name) 
        VALUES (?, ?)`, 
      [pokemonId, pokemonName]
    );
    return rows.insertId;
  }

}

module.exports = PokemonModel;
