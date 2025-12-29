$(document).ready(function () {
  
  // build a pokemon list for trainer select
  populatePokemonSelector();

  // catch the select to build the poket os each trainer
  $("#pokemonSelectorTrainer1").change(() => { 
    const selectedPokemon = $("#pokemonSelectorTrainer1").val();
    infoChoice(
      `Confirm you Selection`,
      `We gonna add: ${selectedPokemon} to you pocket`
    );
    $("#btnSuccess").click(() => {

      let trainer = 1;
      let data = {
        "trainerId": trainer,
        "pokemonName": selectedPokemon,
      }

      $.ajax({
        type: "POST",
        url: "/poket",
        data: JSON.stringify(data),
        dataType: "application/json",
        success: (response) => {
          console.log(response)
        }
      });

      //console.log(`trainer1 got: ${selectedPokemon}`);
    });
  });
  
  $("#pokemonSelectorTrainer2").change(() => { 
    const selectedPokemon = $("#pokemonSelectorTrainer2").val();
    console.log(`trainer2 got: ${selectedPokemon}` )
  });

});
