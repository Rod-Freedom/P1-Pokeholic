function displaySelectedPokemon() {
    var selectedPokemonJSON = localStorage.getItem("SelectedPokemon");
    if (selectedPokemonJSON){
        var selectedPokemon = JSON.parse (selectedPokemonJSON);

        console.log("Selected Pokemon");
        console.log("Name:", selectedPokemon.name);

        else{
            console.log("No Pokemon Selected");
        }
    }
}