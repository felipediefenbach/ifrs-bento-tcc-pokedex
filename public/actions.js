function populatePokemonSelector() {
  let pokemonsToSelect = ["<option selected>Select one Pokemon</option>"];

  $.ajax({
    type: "GET",
    url: "/pokemon",
    dataType: "json",
    async: false,
    success: (response) => {
      response.forEach((element) => {
        pokemonsToSelect.push(`<option value="${element['name']}">${element['name']}</option>`);
      });
    }
  });

  $("#pokemonSelectorTrainer1").append(pokemonsToSelect);
  $("#pokemonSelectorTrainer2").append(pokemonsToSelect);
}

function infoChoice(title, message) {

  const MODAL = `
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
  `
  $("#staticBackdrop").remove();
  $("body").append(MODAL);
  $("#staticBackdrop").modal({
    backdrop: "static",
    keyboard: false,
  })
  $("#staticBackdrop").modal('show')

}