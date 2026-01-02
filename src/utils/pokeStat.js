const { default: Pokedex } = require("pokedex-promise-v2");

async function pokeStat(fulldata) {
  
  const { pokemonName } = fulldata;

  try {
    
    const P = new Pokedex();
    const poke = await P.getPokemonByName(pokemonName);

    let arrayPersonalStatus = []
    const arrayReturnedStatus = poke.stats;

    arrayReturnedStatus.forEach(element => {
      arrayPersonalStatus.push(
        {
          'stat_name': element.stat.name,
          'base_stat': element.base_stat,
          'effort': element.effort,
        }
      )
    });
    
    return arrayPersonalStatus;

  } catch (err) {
    throw new Error(`Houve um erro ao retornar a lista de status do pokemon solicitado: ${err}`);
  }

}

module.exports = pokeStat;
