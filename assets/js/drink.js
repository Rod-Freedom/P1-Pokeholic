/* */
//Variable to save the info from the local storage
let selectedPokeDrink = {};

//Function to push info from local storage into selectedPokeDrink variable
function getSelectedPokeDrink(){
    
    const selectedLocalData = JSON.parse(localStorage.getItem("selectedPokeDrink"));
    selectedPokeDrink = selectedLocalData;
};

//function to loop through ingredients and measures and adding them inside the ingredients-list 'ul'
function renderIngredients(){

    const ingredientsList = document.querySelector("#ingredients-list");
    const drink = selectedPokeDrink.drink

    let i = 1;

        while (drink[`strIngredient${i}`] !== null || drink[`strMeasure${i}`] !== null && i < 16) {
            let ingredient = drink[`strIngredient${i}`] || '';
            let measure = drink[`strMeasure${i}`] ? `${drink[`strMeasure${i}`]} of` : '';
            let ingredientItem = document.createElement('li');
            ingredientItem.textContent = `${measure} ${ingredient}`;
            ingredientsList.appendChild(ingredientItem);
            i++;
        }
    };

//function to extraxt the image from the local storage and adding it inside the cocktail-image div
function loadDrinkImage() {
    const drink = selectedPokeDrink.drink;
    const drinkImage = drink.strDrinkThumb;
    const drinkImageDiv = document.querySelector("#cocktail-image");

    drinkImageDiv.style.backgroundImage = `url('${drinkImage}')`;
}


//FUNCTIONS TO START ADDING STUFF INTO THE DRINKS PAGE

//Function to create a 'p' element inside the drinks-instructions div,
//adding the text we extracted from getInstructions function and
//extract drink's instructions from the local storage
function renderInstructions(){

    const drink = selectedPokeDrink.drink;
    const drinkInstructions = drink.strInstructions;
    const drinksDiv = document.getElementById('drinks-instructions');
    const pElement = document.createElement('p');
    pElement.textContent = drinkInstructions;
    drinksDiv.appendChild(pElement);
}

//Function to call the functions once we load the page 
const readyDrinkFunc = () => {
    getSelectedPokeDrink();
    renderInstructions()
    renderIngredients();
    loadDrinkImage();
}

window.onload = readyDrinkFunc();