function populatePokemonSelector() {
  let pokemonsToSelect = ["<option selected>Select one Pokemon</option>"];

  $.ajax({
    type: "GET",
    url: "/pokemon",
    dataType: "json",
    async: false,
    success: (response) => {
      response.forEach((element) => {
        pokemonsToSelect.push(
          `<option value="${element["name"]}">${element["name"]}</option>`
        );
      });
    },
  });

  $("#pokemonSelectorTrainer1").append(pokemonsToSelect);
  $("#pokemonSelectorTrainer2").append(pokemonsToSelect);
}

async function emptySlotsInMyPockets(trainerName, pocketName) {
  
  const slotsResponse = await $.ajax({
      type: "GET",
      url: `/pocket/slots/${trainerName}/${pocketName}`,
      dataType: "json",
  });

  return slotsResponse["result"];

}

async function listAllMyPockets(fulldata) {
  
  const { trainerName, pocketName, pokemonName } = fulldata;

  const pocketResponse = await $.ajax({
      type: "GET",
      url: `/pocket/list/${trainerName}`,
      dataType: "json",
  });
  
  const allPockets = pocketResponse["result"];
  const skipCurrentPocket = allPockets.filter(i => i !== pocketName);
  let pocketsToSelect = "<option selected>Select destionation</option>";

  for (const element of skipCurrentPocket) {
    const free = await emptySlotsInMyPockets(trainerName, element);
    pocketsToSelect += `<option value="${element}">${element} -> Free slots: ${free}</option>`;
  }

  return pocketsToSelect

}

async function selectPokemonMoves(fulldata) {
  
  const { pokemonName, pokemonLevel } = fulldata;

  const moveInsertResponse = await $.ajax({
      type: "GET",
      url: `/move/${pokemonName}`,
      dataType: "json",
  });

  const { result, status } = moveInsertResponse;

  if (status) {
  
    const moveLevelResponse = await $.ajax({
        type: "GET",
        url: `/move/${pokemonName}/${pokemonLevel}`,
        dataType: "json",
    });
    
    const { result, status } = moveLevelResponse;

    if (status) {

      let moveToSelect = `<option value="empty" selected>Select Attack</option>`;

      for (const element of result) {
        moveToSelect += `<option value="${element}">${element}</option>`;
      }
        
      return moveToSelect;

    } else {
      throw new Error(`${result}`)
    }
  } else {
    throw new Error(`${result}`)
  }
}

async function setPokemonMoves(fulldata) {
  try {
    const response = await $.ajax({
      type: "PUT",
      url: "/move/set/attack",
      data: JSON.stringify(fulldata),
      contentType: "application/json",
    });

    return response;
  } catch (error) {
    return error;
  }
}

async function addPokemon(pokemonName) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "/pokemon/add",
      data: JSON.stringify({ pokemonName }),
      contentType: "application/json",
    });

    return {
      result: response.result,
      status: response.status,
    };
  } catch (error) {
    return {
      result: error,
      status: "error",
    };
  }
}

async function addPokemonInMyPocket(trainerName, pocketName, pokemonName) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "/pocket/pokemon/add",
      data: JSON.stringify({ trainerName, pocketName, pokemonName }),
      contentType: "application/json",
    });

    return {
      result: response.result,
      status: response.status,
    };
  } catch (error) {
    return {
      result: error,
      status: "error",
    };
  }
}

async function movePokemonToOtherPocket(fulldata) {
  try {
    const response = await $.ajax({
      type: "PUT",
      url: "/pocket/pokemon/move",
      data: JSON.stringify(fulldata),
      contentType: "application/json",
    });

    return {
      result: response.result,
      status: response.status,
    };
  } catch (error) {
    return {
      result: error,
      status: "error",
    };
  }
}

async function showPokemonInfo(pokemonName) {
  try {
    const response = await $.ajax({
      type: "GET",
      url: `/info/basic/${pokemonName}`,
      dataType: "json",
    });

    return response;
  } catch (error) {
    return error;
  }
}

async function showPokemonType(pokemonName) {
  try {
    const response = await $.ajax({
      type: "GET",
      url: `/type/${pokemonName}`,
      dataType: "json",
    });

    return response;
  } catch (error) {
    return error;
  }
}

async function showPokemonEvo(pokemonName) {
  try {
    const response = await $.ajax({
      type: "GET",
      url: `/evo/${pokemonName}`,
      dataType: "json",
    });

    return response;
  } catch (error) {
    return error;
  }
}

async function showPokemonStat(pokemonName) {
  try {
    const response = await $.ajax({
      type: "GET",
      url: `/stat/${pokemonName}`,
      dataType: "json",
    });

    return response;
  } catch (error) {
    return error;
  }
}

async function pickPokemonToBattle(fulldata) {
  
  const { battleCycle, trainerName, pocketName } = fulldata
  
  try {
    const response = await $.ajax({
      type: "GET",
      url: `battle/load/${battleCycle}/${trainerName}/${pocketName}`,
      dataType: "json",
    });
    return response;

  } catch (error) {
    return error;
  }
}

function infoChoice(title, message) {
  const MODAL = `
    <div class="modal fade" 
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel" 
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          ${message}
          </div>
          <div class="modal-footer">
            <button id="btnIgnore" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ignore</button>
            <button id="btnSuccess" type="button" class="btn btn-success" data-bs-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `;

  $("#staticBackdrop").remove();
  $("body").append(MODAL);
  $("#staticBackdrop").modal("show");
}

function infoToast(title, message) {
  const TOAST = `
    <div id="infoToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="favicon.png" class="rounded me-2" style="width: 32px; height: 32px;" alt="Info">
        <strong class="me-auto">${title}</strong>
        <small>Info</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;

  $("#infoToast").remove();
  $(".toast-container").append(TOAST);
  $("#infoToast").toast("show");
}

function infoCard(trainer, pokemonName, pokemonLevel, pokemonActHp, pokemonMaxHp) {
  const CARD = `
      <div id="infoCard${trainer}" class="card border-primary shadow">
        <!-- Card Header -->
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 class="card-title mb-0">
            <i class="fas fa-paw me-2"></i>${capFirst(trainer === 'left' ? 'trainer 1' : 'trainer 2')} - Pokémon Details
          </h5>
        </div>
        
        <!-- Card Body -->
        <div class="card-body">
          <!-- Basic Info Row -->
          <div class="row mb-3">
            <div class="col-md-6">

              <div class="row">
                <div class="col-6">
                  <p class="mb-1"><strong>HP:</strong></p>
                  <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-success" 
                      role="progressbar" 
                      style="width: ${(pokemonActHp/pokemonMaxHp) * 100}%">${pokemonActHp}/${pokemonMaxHp}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <div class="input-group">
                  <select id="select-move-${trainer}" class="form-select">
                  </select>
                  <button id="btn-attack-${trainer}" class="btn btn-danger">Attack!</button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="border rounded p-2 bg-light">
                <!-- Sprite - centered -->
                <div class="text-center mb-1">
                  <span class="pokesprite pokemon ${pokemonName}"></span>
                </div>
                
                <!-- Name and badge - centered -->
                <div class="text-center">
                  <div class="d-inline-flex align-items-center">
                    <h5 class="text-capitalize mb-0">${pokemonName}</h5>
                    <span class="badge bg-info ms-2">Lv${pokemonLevel}</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>`
  
  $("#infoCard").remove();
  $(`.card-container-${trainer}`).append(CARD);
}

const rollRandom = () => Math.random().toString(36).substring(2, 10);
const capFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// vai para uma parte separada na gerencia de bolsos
// const response = await handleDelInMyPocketResult(slotNumber, trainerName, pocketName);

// const { result, status } = response;

// $("#pokemonSelectorTrainer1").prop("selectedIndex", 0);

// switch(status) {
  
//   case true:
//     $("#pocketViewTrainer1").bootstrapTable('refresh');
//     infoToast(`Ok!!`,`${result}`);
//     break;

//   case false:
//     infoToast(`Ops!!`,`${result}`);
//     break;

//   default:
//     infoToast(`Erro`,`${result}`)

// }
// async function removePokemonInMyPocket(slotNumber, trainerName, pocketName) {
//   try {
//     const response = await $.ajax({
//       type: "POST",
//       url: "/pocket/del",
//       data: JSON.stringify({ slotNumber, trainerName, pocketName }),
//       contentType: "application/json",
//     });

//     return {
//       result: response.result,
//       status: response.status,
//     };
//   } catch (error) {
//     return {
//       result: error,
//       status: "error",
//     };
//   }
// }