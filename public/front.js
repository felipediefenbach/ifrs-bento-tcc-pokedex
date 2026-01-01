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
    
      const response = await handleAddPokemonResult(pokemonName);
      const { result, status } = response;

      if (status === 'error') {

        infoToast(`Erro`,`${result}`)

      } else {

        const response = await handleAddInMyPocketResult(trainerName, pocketName, pokemonName);
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

  $(document).on("click", ".btn-del", async function() {

    let slotNumber = $(this).data("slot");
    let trainerName = $(this).data("trainer");
    let pocketName = $(this).data("pocket");
    
    const response = await handleDelInMyPocketResult(slotNumber, trainerName, pocketName);

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

  });

  $(document).on("click", ".btn-info", async function() {
    let pokemonName = $(this).data("pokemon");
    const resultInfo = await showPokemonInfo(pokemonName);
    const resultType = await showPokemonType(pokemonName);
    const resultEvo = await showPokemonEvo(pokemonName);
    infoChoice(
      `Basic Status:`,
      `Types: ${resultType["type"]}
      <br \>Height: ${resultInfo["height"]}
      <br \>Weight: ${resultInfo["weight"]}
      <br \>Experience: ${resultInfo["base_exp"]}
      <br \>Evolutions: ${resultEvo["evolutions"]}`
    );
  });

  function actionsPocketFormatter(value, row){
    return `
    <button 
      type="button" 
      class="btn btn-sm btn-danger g-3 btn-del"
      data-slot="${row['slot_number']}"
      data-trainer="${row['trainer_name']}"
      data-pocket="${row['pocket_name']}"
    >Del</button>
    <button 
      type="button" 
      class="btn btn-sm btn-primary g-3 btn-info"
      data-pokemon="${row['pokemon_name']}"
    >Info</button>`
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
        field: "slot_number",
        title: "Slot",
      },
      {
        field: "pokemon_name",
        title: "Pokemon",
      },
      {
        field: "pokemon_state",
        title: "State",
      },
      {
        field: "poket_action",
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
