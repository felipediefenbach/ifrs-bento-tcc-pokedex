const { default: Pokedex } = require("pokedex-promise-v2");

/*
  No nosso caso, a fim de facilitar toda a construção,
  nos limitaremos apenas aos pokemons da primeira geração.
  Por esse motivo, versionGroup = "red-blue", será "hardcoded",
  situação se aplica ao learnMethod = "level-up", serão considerados somente
  movimentos aprendidos através do "aumento de nível"
*/

async function pokeMove(fulldata) {

  const { pokemonName } = fulldata;

  const versionGroup = "red-blue";
  const learnMethod = "level-up";

  try {
    const P = new Pokedex();
    const poke = await P.getPokemonByName(pokemonName);

    const moveByLevel = {};

    poke.moves.forEach((element) => {
      element.version_group_details.forEach((detail) => {
        if (
          detail.version_group.name === versionGroup &&
          detail.move_learn_method.name === learnMethod
        ) {
          const level = detail.level_learned_at;

          if (!moveByLevel[level]) {
            moveByLevel[level] = [];
          }

          if (!moveByLevel[level].includes(element.move.name)) {
            moveByLevel[level].push(element.move.name);
          }
        }
      });
    });

    // Convert to array of objects with comma-separated moves
    const moves = Object.keys(moveByLevel).map((level) => {
      return {
        pokemonLevel: parseInt(level),
        pokemonMoves: moveByLevel[level].join(", "), // comma separated list
      };
    });

    return moves;

  } catch (error) {
    throw new Error(error);
  
  }

}

module.exports = pokeMove;
