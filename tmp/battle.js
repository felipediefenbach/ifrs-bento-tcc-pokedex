let battleActive = true;
let battleCurrentRound = 1;
const battleTrainers = ["felipedie", "machine"];
const battlePockets = ["padrao", "padrao"];

const calculateDamage = (level, power, attack, defense) => Math.floor((((2 * level / 5 + 2) * power * attack / defense) / 50) + 2);
const calculateXp = (xp, level) => Math.floor((xp * level) / 5);
const barPercentage = (actHp, maxHp) => Math.floor((actHp/maxHp) * 100);

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

function checkBattleEnd(curentHp, currentAttacker, currentXp, curentLevel) {
  if ( curentHp <= 0 && battleCurrentRound <= 6 ) {
    battleActive = false;
    ++battleCurrentRound;
    const gainedXp = calculateXp(currentXp, curentLevel)
    infoToast("Battle Over!", `${currentAttacker} Wins !!\nHere gained: ${gainedXp} XP points`);
  }
}

function pokemonBattleRound(curentCycle) {

    $("#btn-start-battle").click(async () => { 

      const givenPokemons = await pokemonByCycle(curentCycle, battleTrainers, battlePockets);
      console.log(givenPokemons);
      const leftPokemon = givenPokemons[0];
      const rightPokemon = givenPokemons[1];

      // LEFT
      const leftName = leftPokemon['pokemonName'];
      const leftHp = leftPokemon['pokemonHp'];
      let leftLocalHp = leftPokemon['pokemonHp'];
      const leftLevel = leftPokemon['pokemonLevel'];
      const leftBaseExp = leftPokemon['pokemonXp'];
      const leftAttack = leftPokemon['pokemonAttack'];
      const leftDefense = leftPokemon['pokemonDefense'];
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
      const rightBaseExp = rightPokemon['pokemonXp'];
      const rightAttack = rightPokemon['pokemonAttack'];
      const rightDefense = rightPokemon['pokemonDefense'];
      const rightMoves = rightPokemon['pokemonMoves'];
      let rightSelect = `<option value="empty" selected>Select Attack</option>`;
      for (const element of rightMoves) {
        const { moveName, movePoints, movePower } = element;
        rightSelect += `<option value="${moveName},${movePoints},${movePower}">${moveName} PP:${movePoints}</option>`;
      }

      infoCard("left", leftName, leftLevel, leftHp);
      infoCard("right", rightName, rightLevel, rightHp);

      $("#select-move-left").append(leftSelect);
      $("#select-move-right").append(rightSelect);

    if ( curentCycle === 1
      || curentCycle === 3
      || curentCycle === 5 ) { 
      $("#btn-attack-left").prop('disabled', false) 
      $("#btn-attack-right").prop('disabled', true) 
    } else {
      $("#btn-attack-left").prop('disabled', true) 
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
      
        const leftDamageDone = calculateDamage(leftLevel, leftMovePower, leftAttack, leftDefense)
        rightLocalHp -= leftDamageDone;
        
        const rightBarPercentage = barPercentage(rightLocalHp, rightHp);
        
        $("#hp-bar-right .progress-bar")
          .css("width", `${rightBarPercentage}%`)
          .text(`${rightLocalHp}/${rightHp} HP`);

        $("#btn-attack-left").prop('disabled', true) 
        $("#btn-attack-right").prop('disabled', false) 
      }

      checkBattleEnd(rightLocalHp, leftName, leftBaseExp, leftLevel);

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
      
        const rightDamageDone = calculateDamage(rightLevel, rightMovePower, rightAttack, rightDefense)
        leftLocalHp -= rightDamageDone;

        const leftBarPercentage = barPercentage(leftLocalHp, leftHp);
        
        $("#hp-bar-left .progress-bar")
          .css("width", `${leftBarPercentage}%`)
          .text(`${leftLocalHp}/${leftHp} HP`);

        $("#btn-attack-right").prop('disabled', true) 
        $("#btn-attack-left").prop('disabled', false) 
      }
      
      checkBattleEnd(leftLocalHp, rightName, rightBaseExp, rightLevel);

    });

  });

}

pokemonBattleRound(battleCurrentRound);