import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

const searchedPokemon = ['pikachu'];
//const searchedPokemon = ['dragonite'];
//const searchedPokemon = ['nidoran'];
const defaultTrainerId = 1;

async function dumpPokemon() {

  try {
    const result = await P.getPokemonByName(searchedPokemon)
    console.log(result);

  } catch (err) {
    throw new Error (`Houce um erro ao retornar o pokemon solicitado: ${err}`);
  };

};

async function pokeBasicInfo(pokemonName) {

  try {

    const poke = await P.getPokemonByName(pokemonName)
    
    let basicInfo = {
      'id': poke[0].id,
      'name': poke[0].name,
      'height': poke[0].height,
      'weight': poke[0].weight,
      'base_experience': poke[0].base_experience,
    };

    return basicInfo;

  } catch (err) {
    throw new Error(`Houve um erro ao retornar os dados básicos do pokemon solicitado: ${err}`);
  };
  
};

async function pokeType(pokemonName) {

  try {
    
    const poke = await P.getPokemonByName(pokemonName)

    let arrayPersonalTypes = []
    const arrayReturnedTypes = poke[0].types;

    arrayReturnedTypes.forEach(element => {
      arrayPersonalTypes.push(element.type.name)
    });
    
    return arrayPersonalTypes;
  
  } catch (err) {
    throw new Error(`Houve um erro ao retornar a lista de formas do pokemon solicitado: ${err}`);
  };
  
};

async function pokeStats(pokemonName) {
  
  try {
    
    const poke = await P.getPokemonByName(pokemonName);

    let arrayPersonalStatus = []
    const arrayReturnedStatus = poke[0].stats;

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

async function pokeAbilities(pokemonName) {

  try {

    const poke = await P.getPokemonByName(pokemonName)
    
    let arrayPersonalAbilities = []
    const arrayReturnedAbilities = poke[0].abilities;

    arrayReturnedAbilities.forEach(element => {
      arrayPersonalAbilities.push(
        {
          'ability_name': element.ability.name,
          'slot': element.slot,
          'is_hidden': element.is_hidden,
        }
      )
    });

    return arrayPersonalAbilities;
  
  } catch (err) {
    throw new Error(`Houve um erro ao retornar a lista de habilidades do pokemon solicitado: ${err}`);
  };
  
};

async function pokeMoves(pokemonName) {

  try {

    const poke = await P.getPokemonByName(pokemonName)
    
    let arrayPersonalMoves = []
    const arrayReturnedMoves = poke[0].moves;

    arrayReturnedMoves.forEach(element => {
      arrayPersonalMoves.push(element.move.name)
    });
    
    return arrayPersonalMoves;
  
  } catch (err) {
    throw new Error(`Houve um erro ao retornar a lista de movimentos do pokemon solicitado: ${err}`);
  };
  
};

async function pokeEvoltutions(pokemonName) {
  
  try {

    const chainId = await pokeBasicInfo(pokemonName);
    const chainGet = await P.getResource(`api/v2/pokemon-species/${chainId.id}/`);      
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
    return speciesNames;

  } catch (err) {
    throw new Error(`Houve um erro ao retornar a lista de evoluções do pokemon solicitado: ${err}`);
  }

}

//await dumpPokemon()
//await pokeEvoltutions(searchedPokemon);
//await pokeBasicInfo(searchedPokemon);
//await pokeType(searchedPokemon);
//await pokeStats(searchedPokemon);
//await pokeAbilities(searchedPokemon);
//await pokeMoves(searchedPokemon);

