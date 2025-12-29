const PokemonService = require("../services/PokemonService");

class PokemonController {
  static async allPokemonNames(req, res) {
    try {
      const pokemonsNames = await PokemonService.allPokemonNames();
      res.json(pokemonsNames);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addPokemon(req, res) {
    try {
      const pokemonName = await PokemonService.addPokemon(req.body);
      if (pokemonName) {
        res.status(200).json(
          { 
            "message": "Pokemon criado com sucesso.", 
            "result": true,
          }
        );
      } else {
        res.status(200).json(
          { 
            "message": "Pokemon já está cadastrado.",
            "result": false,
          }
        );
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

module.exports = PokemonController;
