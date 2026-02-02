$(document).ready(function () {
  const trainerName = localStorage.getItem("username");
  const pocketName = "default";
  populatePokemonSelector();

/////////////////////////////////////////////////////////////////////////////////////
// Pocket                                                                          //
/////////////////////////////////////////////////////////////////////////////////////
  async function editTrainerPockets(trainer, pocket) {

    function pocketEditFormatter(value, row){
      return `
        <button 
          type="button" 
          class="btn btn-sm btn-primary g-3 btn-revive-Trainer1"
          data-slot="${row['slotNumber']}"
          data-trainer="${row['trainerName']}"
          data-pocket="${row['pocketName']}"
        >Restore</button>
        <button 
          type="button" 
          class="btn btn-sm btn-secondary g-3 btn-move-Trainer1"
          data-slot="${row['slotNumber']}"
          data-trainer="${row['trainerName']}"
          data-pocket="${row['pocketName']}"
          data-pokemon="${row['pokemonName']}"
        >Move</button>
        <button 
          type="button" 
          class="btn btn-sm btn-danger g-3 btn-delete-Trainer1"
          data-slot="${row['slotNumber']}"
          data-trainer="${row['trainerName']}"
          data-pocket="${row['pocketName']}"
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

      $("#pocketEditTrainer1").bootstrapTable({
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

  $("#pocketsTrainer1").click(async () => { 

    const POCKET_SELECT = `
    <label for="pocketListTrainer1" class="form-label">Select a pocket:</label>
        <select id="pocketListTrainer1" class="form-select form-select-sm" name="pocketListTrainer1">
        ${await listAllMyPockets({trainerName})}
    </select>`
    const POCKET_ADD = `<button type="button" class="btn btn-success btn-sm btn-create-pockets-Trainer1" data-trainer="${trainerName}">Create</button>`
    const POCKET_DEL = `<button type="button" class="btn btn-primary btn-sm btn-delete-pockets-Trainer1" data-trainer="${trainerName}">Remove</button>`
    

    infoChoice(
      `Pocket Management:`,
      `${POCKET_ADD} ${POCKET_DEL}
      <br /><div class="pocket-manage-trainer1"></div>
      <br />${POCKET_SELECT}
      <br />
      <div class="pocket-div-trainer1"></div>`
    );

    $(document).on("click", "#btnIgnore", function () {
      $("#pocketViewTrainer1").bootstrapTable('refresh');
    });
  
  });

  $(document).on("click", ".btn-create-pockets-Trainer1", function () {

    $(".pocket-manage-trainer1").empty();
    
    const POCKET_NAME = `
      <br />
      <div class="mb-3">
        <div class="input-group has-validation">
          <input id="inputNewPocket" type="text" class="form-control form-control-sm" placeholder=""/>
          <button id="btnConfirmNewPocket" type="button" class="btn btn-success btn-sm">Create</button>
          <div class="invalid-feedback">
            Accept only lowercase letters and numbers !!
          </div>
        </div>
      </div>`

    $(".pocket-manage-trainer1").append(POCKET_NAME);

    $("#inputNewPocket").focus(() => {  
      $("#inputNewPocket").removeClass("is-valid is-invalid");
    });

    $("#btnConfirmNewPocket").click(async () => { 
          
      const trainer = $(this).data("trainer");
      const pocket = await $("#inputNewPocket").val();

      if (!validName(pocket)) {
        $("#inputNewPocket").addClass("is-invalid").removeClass("is-valid");

      } else {
        
        const response = await addPocket({trainer, pocket});
        const { result, status } = response;

        switch(status) {

          case true:
            $('.modal').modal('hide');
            infoToast(`Ok!!`,`${result}`);
            break;

          case false:
            infoToast(`Ops!!`,`${result}`);
            break;

          default:
            infoToast(`Erro`,`${result}`);

        } 
      }

    });

  });

  $(document).on("click", ".btn-delete-pockets-Trainer1", function () {

    const trainer = $(this).data("trainer");
    const pocket = $("#pocketListTrainer1").val();
    $(".pocket-manage-trainer1").empty();

    if ( pocket === 'empty' ) { return void infoToast(`Ops!!`, `Select a pocket to remove !!`); }
    
    const POCKET_DEL_CONFIRM = `
      <br />
      <div class="mb-3">
        <div class="input-group has-validation">
          <input id="inputConfirmDelPocket" type="text" class="form-control form-control-sm" placeholder="Type pocket name here to remove..."/>
          <button id="btnConfirmDelPocket" type="button" class="btn btn-primary btn-sm"><strong>Remove</strong></button>
          <div class="invalid-feedback">
            The informed name is different !!
          </div>
        </div>
      </div>`

    $(".pocket-manage-trainer1").append(POCKET_DEL_CONFIRM);

    $("#inputConfirmDelPocket").focus(() => { 
      $("#inputConfirmDelPocket").removeClass("is-invalid is-valid");
    });
    
    $("#btnConfirmDelPocket").click(async () => {     
      
      const pocketConfirm = await $("#inputConfirmDelPocket").val();

      if ( pocket !== pocketConfirm ) { 
        $("#inputConfirmDelPocket").addClass("is-invalid").removeClass("is-valid");

      } else {

        const response = await delPocket({trainer, pocket});
        const { result, status } = response;

        switch(status) {

          case true:
            $('.modal').modal('hide');
            infoToast(`Ok!!`,`${result}`);
            break;

          case false:
            infoToast(`Ops!!`,`${result}`);
            break;

          default:
            infoToast(`Erro`,`${result}`);

        }
      }
 
    });

  });

  $(document).on("click", ".btn-revive-Trainer1", async function () {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");

    const response = await revivePokemon({trainerName, pocketName, slotNumber});

      const { result, status } = response;
      
      switch(status) {
        
        case true:
          $("#pocketEditTrainer1").bootstrapTable('refresh');
          infoToast(`Ok!!`,`${result}`);
          break;

        case false:
          infoToast(`Ops!!`,`${result}`);
          break;

        default:
          infoToast(`Erro`,`${result}`);

      }
  });
  
  $(document).on("click", ".btn-delete-Trainer1", async function () {
        
    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    
    const response = await delPokemon({trainerName, pocketName, slotNumber});

      const { result, status } = response;
      
      switch(status) {
        
        case true:
          $("#pocketEditTrainer1").bootstrapTable('refresh');
          infoToast(`Ok!!`,`${result}`);
          break;

        case false:
          infoToast(`Ops!!`,`${result}`);
          break;

        default:
          infoToast(`Erro`,`${result}`)

      }
  });

  $(document).on("click", ".btn-move-Trainer1", async function() {

    $(".pocket-manage-trainer1").empty();

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    let pokemonName = $(this).data("pokemon");
        
    const POCKET_SELECT = `
    <br />
    <label for="pocketSelectorTrainer1" class="form-label">${pokemonName}</label>
        <select id="pocketSelectorTrainer1" class="form-select form-select-sm" name="pocketSelectorTrainer1">
        ${await listTransferPockets({trainerName, pocketName, pokemonName})}
    </select>
    <br />
    <button id="btnSuccess" type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Move</button>`

    $(".pocket-manage-trainer1").append(POCKET_SELECT);

    $("#btnSuccess").click(async () => { 

      const destinationPocket = $("#pocketSelectorTrainer1").val();

      if ( destinationPocket === "empty" ) return void infoToast(`Ops !!`,`You not select a destination pocket!!`);
      
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

  $(document).on("change", "#pocketListTrainer1", async function () {
    $(".pocket-div-trainer1").empty();
    $(".pocket-div-trainer1").append(`<table id="pocketEditTrainer1"></table>`); 
    await editTrainerPockets(trainerName, $(this).val());
  });


/////////////////////////////////////////////////////////////////////////////////////
// Front                                                                           //
/////////////////////////////////////////////////////////////////////////////////////
  $("#pokemonSelectorTrainer1").change(() => {
    const pokemonName = $("#pokemonSelectorTrainer1").val();

    infoChoice(
      `Confirm you Selection !!`,
      `We gonna add: ${pokemonName} to you pocket !!
      <br />
      <br />
      <button id="btnSuccess" type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal">Add</button>`
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

  $(document).on("click", ".btn-inform-Trainer1", async function() {
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

  $(document).on("click", ".btn-attack-Trainer1", async function() {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    let pokemonName = $(this).data("pokemon");

    if ( await getConfigedMoves({trainerName, pocketName, slotNumber}) === "none,none,none,none" ) {
      const addedMoves = await addMovesConfig(pokemonName, trainerName, pocketName, slotNumber); // output not use
      console.log(addedMoves);
    }

    let arrayCurrentMoves = [];
    let getedMovesList = await getConfigedMoves({trainerName, pocketName, slotNumber}); // current set o moves in use
    const separatedMoves = getedMovesList.split(',');
    separatedMoves.forEach(element => {
      arrayCurrentMoves.push(element.split('|')[0]);
    });

    let moveToSelect = `<option value="empty" selected>Select Attack</option>`;
    for (const element of arrayCurrentMoves) {
        moveToSelect += `<option value="${element}">${element}</option>`;
    }

    const MOVES_SELECT = `
      <label for="moveSlot1Trainer1" class="form-label">Slot 1</label>
        <select id="moveSlot1Trainer1" class="form-select form-select-sm" name="moveSlot1Trainer1">
          ${moveToSelect}
        </select>
      <br />
      <label for="moveSlot2Trainer1" class="form-label">Slot 2</label>
        <select id="moveSlot2Trainer1" class="form-select form-select-sm" name="moveSlot2Trainer1">
          ${moveToSelect}
        </select>
      <br />
      <label for="moveSlot3Trainer1" class="form-label">Slot 3</label>
        <select id="moveSlot3Trainer1" class="form-select form-select-sm" name="moveSlot3Trainer1">
          ${moveToSelect}
        </select>
      <br />
      <label for="moveSlot4Trainer1" class="form-label">Slot 4</label>
        <select id="moveSlot4Trainer1" class="form-select form-select-sm" name="moveSlot4Trainer1">
          ${moveToSelect}
        </select>
      <br />
      <button id="btnSaveMoves" type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Save Config</button>`

    infoChoice(
      `Pokemon Moves`,
      `${MOVES_SELECT}`
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
        class="btn btn-sm btn-secondary g-3 btn-inform-Trainer1"
        data-pokemon="${row['pokemonName']}"
      >Info</button>
      <button 
        type="button" 
        class="btn btn-sm btn-primary g-3 btn-attack-Trainer1"
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
