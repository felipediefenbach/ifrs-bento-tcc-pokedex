const { default: Pokedex } = require("pokedex-promise-v2");

async function pokeType(fulldata) {
  
  const { pokemonName } = fulldata;

  try {
    
    const P = new Pokedex();
    const pokemon = await P.getPokemonByName(pokemonName)

    const returnedTypes = pokemon.types;

    const typesList = returnedTypes.map(t => t.type.name).join(', ')    
    
    return typesList;
  
  } catch (error) {
    throw new Error(`Houve um erro ao retornar a lista de formas do pokemon solicitado: ${error}`);
  };

}

module.exports = pokeType;
