/* */
//Variable to save the info from the local storage
let selectedPokeDrink = {};

//Function to push info from local storage into selectedPokeDrink variable
function getSelectedPokeDrink(){
    
    const selectedLocalData = JSON.parse(localStorage.getItem("selectedPokeDrink"));
    selectedPokeDrink = selectedLocalData;
    console.log(selectedPokeDrink);

    return selectedPokeDrink;
};

getSelectedPokeDrink();


//function to loop through ingredients within drinks local storage
function loopIngredients(){
    
    const drink = selectedPokeDrink.drink
    
    for(let i = 1; i < 16; i++){
        
        if(drink[`strIngredient${i}`] !== null){
            console.log(drink[`strIngredient${i}`]);
        }
    }
};

loopIngredients();


//function to loop through measures within drinks local storage
function lookMeasures(){

}
//Function to extract drink's instructions from the local storage
function getInstructions(){

    const drink = selectedPokeDrink.drink;
    const drinkInstructions = drink.strInstructions;
    console.log(drinkInstructions);

    return drinkInstructions;
}

getInstructions();

//FUNCTIONS TO START ADDING STUFF INTO THE DRINKS PAGE

//Function to create a 'p' element inside the drinks-instructions
//div and adding the text we extracted from getInstructions function

function addInstructions(instructions){

    const drinksDiv = document.getElementById('drinks-instructions');
    const pElement = document.createElement('p');
    pElement.textContent = instructions;
    drinksDiv.appendChild(pElement);

};
//Calling the function to fill the new 'p' element inside the drinks-innstructions
addInstructions(getInstructions());