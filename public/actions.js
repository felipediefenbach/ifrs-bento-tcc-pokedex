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

async function handleAddPokemonResult(pokemonName) {
  return await addPokemon(pokemonName);
}

async function addPokemonInMyPocket(trainerName, pocketName, pokemonName) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "/pocket/add",
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

async function handleAddInMyPocketResult(trainerName, pocketName, pokemonName) {
  return await addPokemonInMyPocket(trainerName, pocketName, pokemonName);
}

async function removePokemonInMyPocket(slotNumber, trainerName, pocketName) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "/pocket/del",
      data: JSON.stringify({ slotNumber, trainerName, pocketName }),
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

async function handleDelInMyPocketResult(slotNumber, trainerName, pocketName) {
  return await removePokemonInMyPocket(slotNumber, trainerName, pocketName);
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
