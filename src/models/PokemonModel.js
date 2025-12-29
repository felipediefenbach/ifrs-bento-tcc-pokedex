const db = require("../config/Database");

class PokemonModel {

  static async allPokemonNames() {
    const [rows] = await db.query("SELECT name FROM pokemon_names");
    return rows;
  }

  static async findPokemonByName(fulldata){
    const { pokemonName } = fulldata;
    const [rows] = await db.query("SELECT name FROM pokemon WHERE name = ?",
      [pokemonName]
    );
    return rows;
  }

  static async addPokemon(fulldata) {
      const { pokemon_id, name } = fulldata;
      const [rows] = await db.query("INSERT INTO pokemon (id, name) VALUES (?, ?)", 
        [ pokemon_id, name ]
      );
      return rows.insertId;
  }

}

module.exports = PokemonModel;
