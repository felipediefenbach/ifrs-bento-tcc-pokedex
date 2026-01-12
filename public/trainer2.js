$(document).ready(function () {

  const trainerName = "machine";
  const pocketName = "padrao";
  populatePokemonSelector();

  async function editTrainerPockets(trainer, pocket) {

    function pocketEditFormatter(value, row){
      return `
        <button 
          type="button" 
          class="btn btn-sm btn-primary g-3 btn-revive-Trainer2"
          data-slot="${row['slotNumber']}"
          data-trainer="${row['trainerName']}"
          data-pocket="${row['pocketName']}"
          data-pokemon="${row['pokemonName']}"
        >Restore</button>
        <button 
          type="button" 
          class="btn btn-sm btn-danger g-3 btn-delete-Trainer2"
          data-slot="${row['slotNumber']}"
          data-trainer="${row['trainerName']}"
          data-pocket="${row['pocketName']}"
          data-pokemon="${row['pokemonName']}"
        >Delete</button>`
      }
     
      function lifeFormatter(value, row){
        const pokemonCurrHp = row['pokemonCurrHp']
        const pokemonFullHp = row['pokemonFullHp']
        return `
          <div class="progress" style="height: 20px;">
            <div class="progress-bar bg-success" 
              role="progressbar" 
              style="width: ${Math.floor((pokemonCurrHp/pokemonFullHp) * 100)}%">${pokemonCurrHp}/${pokemonFullHp}
            </div>
          </div>`
      }

      $("#pocketEditTrainer2").bootstrapTable({
      url: `/pocket/content/${trainer}/${pocket}`,
      ajax: function(params) {
        $.ajax({
          url: `/pocket/content/${trainer}/${pocket}`,
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
            field: "pokemonCurrHp",
            title: "Life",
            formatter: lifeFormatter,
          },
          {
            field: "pocketAction",
            title: "Actions",
            formatter: pocketEditFormatter,
          },
        ],
      });

  }

  $("#pocketsTrainer2").click(async () => { 

    const POCKET_SELECT = `
    <label for="pocketListTrainer2" class="form-label">Pocket Name</label>
        <select id="pocketListTrainer2" class="form-select form-select-sm" name="pocketListTrainer2">
        ${await listAllMyPockets({trainerName})}
    </select>`

    infoChoice(
      `Pocket Management:`,
      `${POCKET_SELECT}
      <br />
      <div class="pocket-div-trainer2"></div>`
    );

    $(document).on("click", "#btnIgnore", function () {
      $("#pocketViewTrainer2").bootstrapTable('refresh');
    });
  
  });

  $(document).on("click", ".btn-revive-Trainer2", async function () {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");

    const response = await revivePokemon({trainerName, pocketName, slotNumber});

      const { result, status } = response;
      
      switch(status) {
        
        case true:
          $("#pocketEditTrainer2").bootstrapTable('refresh');
          infoToast(`Ok!!`,`${result}`);
          break;

        case false:
          infoToast(`Ops!!`,`${result}`);
          break;

        default:
          infoToast(`Erro`,`${result}`)

      }
  });
  
  $(document).on("click", ".btn-delete-Trainer2", async function () {
        
    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    
    const response = await delPokemon({trainerName, pocketName, slotNumber});

      const { result, status } = response;
      
      switch(status) {
        
        case true:
          $("#pocketEditTrainer2").bootstrapTable('refresh');
          infoToast(`Ok!!`,`${result}`);
          break;

        case false:
          infoToast(`Ops!!`,`${result}`);
          break;

        default:
          infoToast(`Erro`,`${result}`)

      }
  });

  $(document).on("change", "#pocketListTrainer2", async function () {
    $("#pocketEditTrainer2").remove();
    $(".pocket-div-trainer2").append(`<table id="pocketEditTrainer2"></table>`); 
    await editTrainerPockets(trainerName, $(this).val());
  });

/////////////////////////////////////////////////////////////////////////////////////

  $("#pokemonSelectorTrainer2").change(() => {
    const pokemonName = $("#pokemonSelectorTrainer2").val();

    infoChoice(
      `Confirm you Selection`,
      `We gonna add: ${pokemonName} to you pocket
      <br />
      <br />
      <button id="btnSuccess" type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal">Add</button>`
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
        ${await listTransferPockets({trainerName, pocketName, pokemonName})}
    </select>
    <br />
    <button id="btnSuccess" type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Move</button>`

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
      <br />HP: ${resultStat["hp"]}
      <br />Attack: ${resultStat["attack"]}
      <br />Defense: ${resultStat["defense"]}`
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
      <button id="btnSaveMoves" type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Save Config</button>`

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

  function lifeFormatter(value, row){
    const pokemonCurrHp = row['pokemonCurrHp']
    const pokemonFullHp = row['pokemonFullHp']
    return `
      <div class="progress" style="height: 20px;">
        <div class="progress-bar bg-success" 
          role="progressbar" 
          style="width: ${Math.floor((pokemonCurrHp/pokemonFullHp) * 100)}%">${pokemonCurrHp}/${pokemonFullHp}
        </div>
      </div>`
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
        field: "pokemonCurrHp",
        title: "Life",
        formatter: lifeFormatter,
      },
      {
        field: "pocketAction",
        title: "Actions",
        formatter: actionsPocketFormatter,
      },
    ],
  });

});
