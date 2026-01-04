$(document).ready(function () {
  // build a pokemon list for trainer select
  populatePokemonSelector();

  // catch the select to build the poket os each trainer
  const trainerName = "felipedie";
  const pocketName = "padrao";

  $("#pokemonSelectorTrainer1").change(() => {
    const pokemonName = $("#pokemonSelectorTrainer1").val();

    infoChoice(
      `Confirm you Selection`,
      `We gonna add: ${pokemonName} to you pocket`
    );

    $("#btnIgnore").click(() => { 
      $("#pokemonSelectorTrainer1").prop("selectedIndex", 0);
      $("#pocketViewTrainer1").bootstrapTable('refresh');
    });
    
    $("#btnSuccess").click(async () => {
    
      // Primeiro criamos o pokemon na tabela pokemon
      const resultAdd = await addPokemon(pokemonName);
      const resultInfo = await showPokemonInfo(pokemonName);
      const resultStat = await showPokemonStat(pokemonName);

      if (
        resultAdd["status"] === 'error'
        && resultInfo["status"]
        && resultStat["status"]
      ) {

        infoToast(`Erro`,`${result}`)

      } else {

        const response = await addPokemonInMyPocket(trainerName, pocketName, pokemonName);
        console.log(response);
        const { result, status } = response;
       
        $("#pokemonSelectorTrainer1").prop("selectedIndex", 0);

        switch(status) {
          
          case true:
            $("#pocketViewTrainer1").bootstrapTable('refresh');
            infoToast(`Ok!!`,`${result}`);
            break;

          case false:
            infoToast(`Ops!!`,`${result}`);
            break;

          default:
            infoToast(`Erro`,`${result}`)

        }
      }
    });
  });

  $(document).on("click", ".btn-move", async function() {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    let pokemonName = $(this).data("pokemon");
    
    infoChoice(
      `Select Destion Pocket`,
      `${await listAllMyPockets({trainerName, pocketName, pokemonName})}`
    )

    $("#btnSuccess").click(async () => { 
      const destinationPocket = $("#pocketSelectorTrainer1").val();
      const response = await movePokemonToOtherPocket(
        {
          trainerName,
          pocketName,
          slotNumber,
          destinationPocket
        }
      );

      const { result, status } = response;

        switch(status) {
          
          case true:
            $("#pocketViewTrainer1").bootstrapTable('refresh');
            infoToast(`Ok!!`,`${result}`);
            break;

          case false:
            infoToast(`Ops!!`,`${result}`);
            break;

          default:
            infoToast(`Erro`,`${result}`)
            
        }
    });

  });

  $(document).on("click", ".btn-inform", async function() {
    let pokemonName = $(this).data("pokemon");
    const resultInfo = await showPokemonInfo(pokemonName);
    const resultType = await showPokemonType(pokemonName);
    const resultEvo = await showPokemonEvo(pokemonName);
    const resultStat = await showPokemonStat(pokemonName);
    infoChoice(
      `Basic Info:`,
      `<strong>Characteristics:</strong>
      <br />Types: ${resultType["type"]}
      <br />Height: ${resultInfo["height"]}
      <br />Weight: ${resultInfo["weight"]}
      <br />Experience: ${resultInfo["base_exp"]}
      <br />Evolutions: ${resultEvo["evolutions"]}
      <br />
      <br /><strong>Basic Stat:</strong>
      <br />HP: ${resultStat["hp"].split(',')[0]}
      <br />Attack: ${resultStat["attack"].split(',')[0]}
      <br />Defense: ${resultStat["defense"].split(',')[0]}
      <br />Speed: ${resultStat["speed"].split(',')[0]}
      <br />Especial Attack: ${resultStat["sattack"].split(',')[0]}
      <br />Especial Defense: ${resultStat["sdefense"].split(',')[0]}`
    );
  });

  $(document).on("click", ".btn-attack", async function() {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    let pokemonName = $(this).data("pokemon");
    let pokemonLevel = $(this).data("level");

    infoChoice(
      `Pokemon Moves`,
      `${await selectPokemonMoves({pokemonName, pokemonLevel})}`
    )

    $("#btnSaveMoves").click(async () => { 

      const slot1 = $("#moveSlot1Trainer1").val();      
      const slot2 = $("#moveSlot2Trainer1").val();      
      const slot3 = $("#moveSlot3Trainer1").val();      
      const slot4 = $("#moveSlot4Trainer1").val(); 
      
      const slots = [slot1, slot2, slot3, slot4]
      const slotsRemarked = slots.map(i => i === 'empty' ? rollRandom() : i);
      const uniqueMoves = new Set(slotsRemarked)
      
      if (uniqueMoves.size === 4) {

        const cleanMoves = slots.filter(i => i !== 'empty');
        const moveList = cleanMoves.join(',')
        
        const response = await setPokemonMoves({moveList, trainerName, pocketName, slotNumber});
        const { result, status } = response;
        if (status) {
          infoToast(
            `Ok !!`,
            `The moves are saved !!`
          )
        } else {
          infoToast(
            `Ops !!`,
            `Something goes worng !!`
          )
          console.error(result);
        }
      } else {
        infoToast(
          `Ops !!`,
          `You can't select repeated moves !!`
        )
      }
    });
  });

  function actionsPocketFormatter(value, row){
    return `
    <button 
      type="button" 
      class="btn btn-sm btn-danger g-3 btn-move"
      data-slot="${row['slotNumber']}"
      data-trainer="${row['trainerName']}"
      data-pocket="${row['pocketName']}"
      data-pokemon="${row['pokemonName']}"
    >Move</button>
    <button 
      type="button" 
      class="btn btn-sm btn-secondary g-3 btn-inform"
      data-pokemon="${row['pokemonName']}"
    >Info</button>
    <button 
      type="button" 
      class="btn btn-sm btn-primary g-3 btn-attack"
      data-pokemon="${row['pokemonName']}"
      data-level="${row['pokemonLevel']}"
      data-slot="${row['slotNumber']}"
      data-trainer="${row['trainerName']}"
      data-pocket="${row['pocketName']}"
    >Attack</button>`
  }

  $("#pocketViewTrainer1").bootstrapTable({
    url: `/pocket/content/${trainerName}/${pocketName}`,
    ajax: function(params) {
      $.ajax({
        url: `/pocket/content/${trainerName}/${pocketName}`,
        data: "json",
        success: function (response) {
          params.success(response['result']);
        }
      });
    },
    columns: [
      {
        field: "slotNumber",
        title: "Slot",
      },
      {
        field: "pokemonName",
        title: "Pokemon",
      },
      {
        field: "pokemonLevel",
        title: "Level",
      },
      {
        field: "pokemonState",
        title: "State",
      },
      {
        field: "pocketAction",
        title: "Actions",
        formatter: actionsPocketFormatter,
      },
    ],
  });

  /*
    ADVERSARY
  */
 
  $("#pokemonSelectorTrainer2").change(() => {
    const selectedPokemon = $("#pokemonSelectorTrainer2").val();

    infoToast(
      `nailedit`,
      `chat gtp is stupid`,
    )
    
    console.log(`trainer2 got: ${selectedPokemon}`);
  
  });

});
