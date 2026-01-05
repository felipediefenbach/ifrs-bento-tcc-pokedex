const { default: Pokedex } = require("pokedex-promise-v2");

async function movePp(moveName) {


  try {
    const P = new Pokedex();
    const move = await P.getMoveByName(moveName);
    
    return `${move.pp}|${move.power === null ? 1 : move.power}`;

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = movePp;
