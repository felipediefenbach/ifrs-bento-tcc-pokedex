const calculateDamage = (level, power, attack, defense) => Math.floor((((2 * level / 5 + 2) * power * attack / defense) / 50) + 2);
const barPercentage = (actHp, maxHp) => Math.floor((actHp/maxHp) * 100);
//const calculateXp = (xp, level) => Math.floor((xp * level) / 5);

async function checkFirstTurn(trainers, pockets) {    
  
  let trainersPokemons = [];

  for ( let t=0; t < trainers.length; t++ ) {

    let trainerName = trainers[t];
    let pocketName = pockets[t];  
    trainersPokemons.push(await checkFirstCombatblePokemons({trainerName, pocketName}));

  }

  if (trainersPokemons.length === 2) {
    
    const team1 = trainersPokemons[0];
    const team2 = trainersPokemons[1];
    
    const firstTurn = team1
      .map((pokemon1, index) => {
        const pokemon2 = team2[index];
        if (pokemon1["pokemonCurrHp"] > 0 && pokemon2["pokemonCurrHp"] > 0) {
          return pokemon1["slotNumber"];
        }
        return null;
      })
      .filter(slot => slot !== null);
    console.log('ret-turn', firstTurn[0]);
    return firstTurn[0];
  }

}

async function checkPoketSize(trainers, pockets) {    

  for ( let t=0; t < trainers.length; t++ ) {

    let trainerName = trainers[t];
    let pocketName = pockets[t];
    const free = await emptySlotsInMyPockets(trainerName, pocketName);
    
    if ( free > 0 ) {
      infoToast(
        `Battle Problem !!`,
        `Only 6 X 6 battles are allowed !!<br /> Add more pokemon to the ${capFirst(trainerName)} pocket !!`
      );
      return false;
    }
  }
  return true
}

async function checkMovesConfig(pokemonName, trainerName, pocketName, slotNumber) {

  const getedConfig = await getConfigedMoves({trainerName, pocketName, slotNumber});

  if ( getedConfig === "none,none,none,none" ) {
    const pokemonLevel = 1;
    const resultMoves = await selectPokemonMovesByLevel({pokemonName, pokemonLevel});
    const moveList = resultMoves.map(m => m.pokemonMoves).join(',');
    const addedMoves = await setPokemonMoves({moveList, trainerName, pocketName, slotNumber});
    const { status, result } = addedMoves;
    if (status && result === 1) {
      const newMoves = await getConfigedMoves({trainerName, pocketName, slotNumber});
      const newArrayMoves = newMoves.split(';');
      const addedNewMoves = [];
      newArrayMoves.forEach(element => {
        addedNewMoves.push(
          { 
            moveName: element[0], 
            movePoints: element[1], 
            movePower: element[2] 
          }
        );
      });
      return addedNewMoves;
    }
  }

}

async function pokemonByCycle(cycles, trainers, pockets) {    
  
  let battleAdversaries = [];

  for ( let t=0; t < trainers.length; t++ ) {
    
    let trainerName = trainers[t];
    let pocketName = pockets[t];
    let battleCycle = cycles;

    let adversaries = await pickPokemonToBattleByCycle({battleCycle, trainerName, pocketName})
    battleAdversaries.push(adversaries);
  
  }
  return battleAdversaries;

}

async function checkBattleEnd(
  attackerTrainer, 
  attackerPocket, 
  attackerSlot, 
  attackerHp,
  defenderTrainer, 
  defenderPocket, 
  defenderSlot,
  defenderHp,
  currentAttacker, 
  currentDefender
) {
  if (attackerHp === 0 || defenderHp === 0) {

    //const gainedXp = calculateXp(currentXp, curentLevel)
    const gainedXp = 10;

    const winner = await pokemonWinner({attackerTrainer, attackerPocket, attackerSlot, attackerHp, gainedXp});
    const loser = await pokemonLoser({defenderTrainer, defenderPocket, defenderSlot});

    if (loser['status'] && winner['status']) {
      battleActive = false;
      infoToast(
        `Battle Over!`,
        `${capFirst(currentAttacker)} Wins !!<br \>${capFirst(currentDefender)} Fainted !!<br \>${capFirst(currentAttacker)} gained: ${gainedXp} XP`
      );
    } else {
      console.error(loser['result'], winner['result'])
    }
  }
}

//====================================================================================================//
//                                            BATTLE START                                            //
//====================================================================================================//

$("#btn-start-battle").click(async () => { 

  const battleTrainers = ["felipedie", "machine"];
  const battlePockets = ["padrao", "padrao"];
  let battleActive = true;
  let battleRoundCycle = await checkFirstTurn(battleTrainers, battlePockets);
  if (!battleRoundCycle) {
    infoToast(
      `Battle's Over !!`,
      `There's no more availables Pokemon to battle !!<br />You need revive they or add new ones !!`
    );
    return;
  }

  if (!await checkPoketSize(battleTrainers, battlePockets)) { return };

  const givenPokemons = await pokemonByCycle(battleRoundCycle, battleTrainers, battlePockets);

  let leftPokemon = givenPokemons[0];
  let rightPokemon = givenPokemons[1];

  // LEFT
  const leftTrainer = leftPokemon['trainerName'];
  const leftPocket = leftPokemon['pocketName'];
  const leftName = leftPokemon['pokemonName'];
  const leftSlot = leftPokemon['slotNumber'];
  const leftCurrHp = leftPokemon['pokemonCurrHp'];
  const leftFullHp = leftPokemon['pokemonFullHp'];
  let leftLocalHp = leftPokemon['pokemonCurrHp'];
  const leftLevel = leftPokemon['pokemonLevel'];
  const leftBaseExp = leftPokemon['pokemonXp'];
  const leftAttack = leftPokemon['pokemonAttack'];
  const leftDefense = leftPokemon['pokemonDefense'];
  const leftMoves = leftPokemon['pokemonMoves'];

  const newLeftMoves = await checkMovesConfig(leftName, leftTrainer, leftPocket, battleRoundCycle);
  newLeftMoves && (leftMoves = newLeftMoves)

  let leftSelect;
  for (const element of leftMoves) {
    const { moveName, movePoints, movePower } = element;
    leftSelect += `<option value="${moveName},${movePoints},${movePower}">${moveName} PP:${movePoints}</option>`;
  }

  // RIGHT
  const rightTrainer = rightPokemon['trainerName'];
  const rightPocket = rightPokemon['pocketName'];
  const rightName = rightPokemon['pokemonName'];
  const rightSlot = rightPokemon['slotNumber'];
  const rightCurrHp = rightPokemon['pokemonCurrHp'];
  const rightFullHp = rightPokemon['pokemonFullHp'];
  let rightLocalHp = rightPokemon['pokemonCurrHp'];
  const rightLevel = rightPokemon['pokemonLevel'];
  const rightBaseExp = rightPokemon['pokemonXp'];
  const rightAttack = rightPokemon['pokemonAttack'];
  const rightDefense = rightPokemon['pokemonDefense'];
  const rightMoves = rightPokemon['pokemonMoves'];
  
  const newRightMoves = await checkMovesConfig(rightName, rightTrainer, rightPocket, battleRoundCycle);
  newRightMoves && (rightMoves = newRightMoves);

  let rightSelect;
  for (const element of rightMoves) {
    const { moveName, movePoints, movePower } = element;
    rightSelect += `<option value="${moveName},${movePoints},${movePower}">${moveName} PP:${movePoints}</option>`;
  }

  if ( $("#infoCardleft").length ) { $("#infoCardleft").remove(); }
  if ( $("#infoCardright").length ) { $("#infoCardright").remove(); }
  infoCard("left", leftName, leftLevel, leftCurrHp, leftFullHp);
  infoCard("right", rightName, rightLevel, rightCurrHp, rightFullHp);

  $("#select-move-left").append(leftSelect);
  $("#select-move-right").append(rightSelect);
  
  if ( 
      (leftSlot === 1 && rightSlot === 1)
      || (leftSlot === 3 && rightSlot === 3)
      || (leftSlot === 5 && rightSlot === 5)
  ) { 
    $("#select-move-left").prop('disabled', false) 
    $("#btn-attack-left").prop('disabled', false) 
    $("#select-move-right").prop('disabled', true) 
    $("#btn-attack-right").prop('disabled', true) 
  } else {
    $("#select-move-left").prop('disabled', true) 
    $("#btn-attack-left").prop('disabled', true) 
    $("#select-move-right").prop('disabled', false) 
    $("#btn-attack-right").prop('disabled', false) 
  }

  $("#btn-attack-left").click(() => { 
    
    if (!battleActive) return

    const leftUsedMove = $("#select-move-left").val();
    const leftMoveProperties = leftUsedMove.split(',')
    const leftMovePp = leftMoveProperties[1];
    const leftMovePower = leftMoveProperties[2];

    if ( leftUsedMove === 'empty' ) {
      infoToast(
        `Ops!!`,
        `Select your move to Attack !!`
      )
    } else if ( leftMovePp === 0 ) {
      infoToast(
        `Ops!!`,
        `You could'n use this move, no more PP !!`
      )
    } else {
    
      //const leftDamageDone = calculateDamage(leftLevel, leftMovePower, leftAttack, leftDefense)
      const leftDamageDone = 30;
      (rightLocalHp -= leftDamageDone) < 0 ? rightLocalHp = 0 : rightLocalHp;

      
      const rightBarPercentage = barPercentage(rightLocalHp, rightCurrHp);
      
      $("#hp-bar-right .progress-bar")
        .css("width", `${rightBarPercentage}%`)
        .text(`${rightLocalHp}/${rightCurrHp} HP`);

      $("#select-move-left").prop('disabled', true) 
      $("#btn-attack-left").prop('disabled', true) 
      $("#select-move-right").prop('disabled', false) 
      $("#btn-attack-right").prop('disabled', false) 
      
    }

    checkBattleEnd(
      leftTrainer,
      leftPocket,
      leftSlot,
      leftLocalHp,
      rightTrainer,
      rightPocket,
      rightSlot,
      rightLocalHp,
      leftName,
      rightName
    );

  });

  $("#btn-attack-right").click(() => { 

    const rightUsedMove = $("#select-move-right").val();
    const rightMoveProperties = rightUsedMove.split(',')
    const rightMovePp = rightMoveProperties[1];
    const rightMovePower = rightMoveProperties[2];

    if ( rightUsedMove === 'empty' ) {
      infoToast(
        `Ops!!`,
        `Select your move to Attack !!`
      )
    } else if ( rightMovePp === 0 ) {
      infoToast(
        `Ops!!`,
        `You could'n use this move, no more PP !!`
      )
    } else {
    
      //const rightDamageDone = calculateDamage(rightLevel, rightMovePower, rightAttack, rightDefense)
      const rightDamageDone = 30;
      (leftLocalHp -= rightDamageDone) < 0 ? leftLocalHp = 0 : leftLocalHp

      const leftBarPercentage = barPercentage(leftLocalHp, leftCurrHp);
      
      $("#hp-bar-left .progress-bar")
        .css("width", `${leftBarPercentage}%`)
        .text(`${leftLocalHp}/${leftCurrHp} HP`);

      $("#select-move-right").prop('disabled', true) 
      $("#btn-attack-right").prop('disabled', true) 
      $("#select-move-left").prop('disabled', false) 
      $("#btn-attack-left").prop('disabled', false) 
    }
    
    checkBattleEnd(
      rightTrainer, 
      rightPocket, 
      rightSlot,
      rightLocalHp,
      leftTrainer,
      leftPocket,
      leftSlot,
      leftLocalHp,
      rightName,
      leftName
    );

  });

});

 