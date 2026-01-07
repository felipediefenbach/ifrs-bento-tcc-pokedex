async function pokemonByCycle(cycles, trainers, pockets) {    
  let battleAdversaries = [];

  for ( let t=0; t < trainers.length; t++ ) {
    trainerName = trainers[t];
    pocketName = pockets[t];
    battleCycle = cycles;

    const adversaries = await pickPokemonToBattle({battleCycle, trainerName, pocketName});
    battleAdversaries.push(adversaries);
  
  }
  return battleAdversaries;

}

$("#btn-start-battle").click(async () => { 
  
  let battleRound = 1;
  const battleTrainers = ["felipedie", "machine"];
  const battlePockets = ["padrao", "padrao"];

  const givenPokemons = await pokemonByCycle(battleRound, battleTrainers, battlePockets);
  console.log(givenPokemons);
  const leftPokemon = givenPokemons[0];
  const rightPokemon = givenPokemons[1];

  // LEFT
  const leftName = leftPokemon['pokemonName'];
  const leftHp = leftPokemon['pokemonHp'];
  let leftLocalHp = leftPokemon['pokemonHp'];
  const leftLevel = leftPokemon['pokemonLevel'];
  const leftMoves = leftPokemon['pokemonMoves'];
  let leftSelect = `<option value="empty" selected>Select Attack</option>`;
  for (const element of leftMoves) {
    const { moveName, movePoints, movePower } = element;
    leftSelect += `<option value="${moveName},${movePoints},${movePower}">${moveName} PP:${movePoints}</option>`;
  }

  // RIGHT
  const rightName = rightPokemon['pokemonName'];
  const rightHp = rightPokemon['pokemonHp'];
  let rightLocalHp = rightPokemon['pokemonHp'];
  const rightLevel = rightPokemon['pokemonLevel'];
  const rightMoves = rightPokemon['pokemonMoves'];
  let rightSelect = `<option value="empty" selected>Select Attack</option>`;
  for (const element of rightMoves) {
    const { moveName, movePoints, movePower } = element;
    rightSelect += `<option value="${moveName},${movePoints},${movePower}">${moveName} PP:${movePoints}</option>`;
  }


  infoCard("left", leftName, leftLevel, leftLocalHp, leftHp);
  infoCard("right", rightName, rightLevel, rightLocalHp, rightHp);

  $("#select-move-left").append(leftSelect);
  $("#select-move-right").append(rightSelect);
  
  if ( battleRound === 1
    || battleRound === 3
    || battleRound === 5 ) { 
    $("#btn-attack-left").prop('disabled', false) 
    $("#btn-attack-right").prop('disabled', true) 
  } else {
    $("#btn-attack-left").prop('disabled', true) 
    $("#btn-attack-right").prop('disabled', false) 
  }

  $("#btn-attack-left").click(() => { 
    //console.log('clicked');
    const usedMove = $("#select-move-left").val();
    if (usedMove === 'empty') {
      infoToast(
        `Ops!!`,
        `Select your move to Attack !!`
      )
    } else {
      console.log(usedMove);
    }
  });

  /*

  function calulateDamage(attack, hp) {
    let result = hp - attack;
    return result
  }

  for ( let c=1; c <= 6; c++ ) {
  
    const givenPokemons = await pokemonByCycle(c);

    const leftPokemon = givenPokemons[0];
    const rightPokemon = givenPokemons[1];
    const leftPokemonHp = leftPokemon['pokemonHp']
    const rightPokemonHp = rightPokemon['pokemonHp']

    // console.log('left', leftPokemonHp);
    // console.log('right', rightPokemonHp);

  while ( leftPokemonHp > 0 || rightPokemonHp > 0 ) {
      
    // console.log('left', leftPokemonHp);
    // console.log('right', rightPokemonHp);
    let dam = 1;

    let remainingLife = calulateDamage(dam, 10);
    if (remainingLife === 0){
      break;
    }

    dam--
    console.log(dam);
  //     infoCard("trainer2", "bulbasaur", 1, 65, 65);
  //     infoCard("trainer1", "bulbasaur", 1, 65, 65);  
    
  }
    
  }
*/

});

