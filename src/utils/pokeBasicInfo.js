const { default: Pokedex } = require("pokedex-promise-v2");

async function pokeBasicInfo(fulldata) {
  
  const { pokemonName } = fulldata;

  try {
    const P = new Pokedex();
    const pokemon = await P.getPokemonByName(pokemonName);

    let basicInfo = {
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      pokemonHeight: pokemon.height,
      pokemonWeight: pokemon.weight,
      pokemonBaseExp: pokemon.base_experience,
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
