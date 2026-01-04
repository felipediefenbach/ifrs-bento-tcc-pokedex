const { default: Pokedex } = require("pokedex-promise-v2");

async function pokeEvo(fulldata) {

  const { pokemonId } = fulldata;

  try {

    const P = new Pokedex();

    const chainGet = await P.getResource(`api/v2/pokemon-species/${pokemonId}/`);      
    const chainOutput = await P.getResource(`${chainGet.evolution_chain.url}`);

    let speciesNames = []

    function extractEvolutions(chain) {
      if (chain.species) {
        speciesNames.push(chain.species.name);
      }
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach(element => {
          extractEvolutions(element);
        });
      }
    }
    
    extractEvolutions(chainOutput.chain);

    const species = speciesNames.join('-> ');
    return species;

  } catch (error) {
    throw new Error(error);
  
  }
}
module.exports = pokeEvo;
