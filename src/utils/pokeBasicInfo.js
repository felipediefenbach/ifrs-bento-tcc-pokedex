const { default: Pokedex } = require("pokedex-promise-v2");

async function pokeBasicInfo(pokemonName) {
  
  try {
    const P = new Pokedex();
    const pokemon = await P.getPokemonByName(pokemonName);

    let basicInfo = {
      pokemon_id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      base_exp: pokemon.base_experience,
    };


    return basicInfo;

  } catch (error) {  
    console.error("Error fetching pokeBasicInfo:", error.message);
    throw new Error(
      `Failed to fetch data for ${pokemonName}: ${error.message}`
    );
  }

}

module.exports = pokeBasicInfo;
