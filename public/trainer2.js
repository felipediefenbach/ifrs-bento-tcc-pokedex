$(document).ready(function () {

  const trainerName = "machine";
  const pocketName = "padrao";
  populatePokemonSelector();

  $("#pokemonSelectorTrainer2").change(() => {
    const pokemonName = $("#pokemonSelectorTrainer2").val();

    infoChoice(
      `Confirm you Selection`,
      `We gonna add: ${pokemonName} to you pocket`
    );

    $("#btnIgnore").click(() => { 
      $("#pokemonSelectorTrainer2").prop("selectedIndex", 0);
      $("#pocketViewTrainer2").bootstrapTable('refresh');
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
        const { result, status } = response;
       
        $("#pokemonSelectorTrainer2").prop("selectedIndex", 0);

        switch(status) {
          
          case true:
            $("#pocketViewTrainer2").bootstrapTable('refresh');
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

  $(document).on("click", ".btn-move-Trainer2", async function() {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    let pokemonName = $(this).data("pokemon");
    
    const POCKET_SELECT = `
    <label for="pocketSelectorTrainer2" class="form-label">${pokemonName}</label>
        <select id="pocketSelectorTrainer2" class="form-select form-select-sm" name="pocketSelectorTrainer2">
        ${await listAllMyPockets({trainerName, pocketName, pokemonName})}
    </select>`

    infoChoice(
      `Select Destion Pocket`,
      `${POCKET_SELECT}`
    )

    $("#btnSuccess").click(async () => { 
      const destinationPocket = $("#pocketSelectorTrainer2").val();
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
            $("#pocketViewTrainer2").bootstrapTable('refresh');
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

  $(document).on("click", ".btn-inform-Trainer2", async function() {
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

  $(document).on("click", ".btn-attack-Trainer2", async function() {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    let pokemonName = $(this).data("pokemon");
    let pokemonLevel = $(this).data("level");

    const moveToSelect = await selectPokemonMoves({pokemonName, pokemonLevel})
    const MOVES_SELECT = `
      <label for="moveSlot1Trainer2" class="form-label">Slot 1</label>
        <select id="moveSlot1Trainer2" class="form-select form-select-sm" name="moveSlot1Trainer2">
          ${moveToSelect}
        </select>
      <br />
      <label for="moveSlot2Trainer2" class="form-label">Slot 2</label>
        <select id="moveSlot2Trainer2" class="form-select form-select-sm" name="moveSlot2Trainer2">
          ${moveToSelect}
        </select>
      <br />
      <label for="moveSlot3Trainer2" class="form-label">Slot 3</label>
        <select id="moveSlot3Trainer2" class="form-select form-select-sm" name="moveSlot3Trainer2">
          ${moveToSelect}
        </select>
      <br />
      <label for="moveSlot4Trainer2" class="form-label">Slot 4</label>
        <select id="moveSlot4Trainer2" class="form-select form-select-sm" name="moveSlot4Trainer2">
          ${moveToSelect}
        </select>
      <br />
      <button id="btnSaveMoves" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Config</button>`

    infoChoice(
      `Pokemon Moves`,
      `${MOVES_SELECT}`
    )

    $("#btnSaveMoves").click(async () => { 

      const slot1 = $("#moveSlot1Trainer2").val();      
      const slot2 = $("#moveSlot2Trainer2").val();      
      const slot3 = $("#moveSlot3Trainer2").val();      
      const slot4 = $("#moveSlot4Trainer2").val(); 
      
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
      class="btn btn-sm btn-danger g-3 btn-move-Trainer2"
      data-slot="${row['slotNumber']}"
      data-trainer="${row['trainerName']}"
      data-pocket="${row['pocketName']}"
      data-pokemon="${row['pokemonName']}"
    >Move</button>
    <button 
      type="button" 
      class="btn btn-sm btn-secondary g-3 btn-inform-Trainer2"
      data-pokemon="${row['pokemonName']}"
    >Info</button>
    <button 
      type="button" 
      class="btn btn-sm btn-primary g-3 btn-attack-Trainer2"
      data-pokemon="${row['pokemonName']}"
      data-level="${row['pokemonLevel']}"
      data-slot="${row['slotNumber']}"
      data-trainer="${row['trainerName']}"
      data-pocket="${row['pocketName']}"
    >Attack</button>`
  }

  $("#pocketViewTrainer2").bootstrapTable({
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
        field: "pokemonHp",
        title: "Life",
      },
      {
        field: "pocketAction",
        title: "Actions",
        formatter: actionsPocketFormatter,
      },
    ],
  });

});
