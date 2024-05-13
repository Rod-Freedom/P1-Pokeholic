const btnSave = document.querySelector('#save-btn');
let selectedPokeDrink = {}; // Variable to save the info from the local storage

const savePokeDrinkToLocal = () => {
    if (localStorage.getItem('savedPokeDrinks')) {
        localSavesArray = JSON.parse(localStorage.getItem('savedPokeDrinks'));
        localSavesArray.push(selectedPokeDrink);
        localStorage.setItem('savedPokeDrinks', JSON.stringify(localSavesArray));
        renderSaves();
    } else {
        localSavesArray.push(selectedPokeDrink);
        localStorage.setItem('savedPokeDrinks', JSON.stringify(localSavesArray));
        renderSaves();
    }
};

//Function to push info from local storage into selectedPokeDrink variable
function getSelectedPokeDrink(){
    const selectedLocalData = JSON.parse(localStorage.getItem("selectedPokeDrink"));
    selectedPokeDrink = selectedLocalData;
};

//Save info in local storage
function drinkLocalStorage(){
    savedPokeDrinks.push(selectedPokeDrink);
    localStorage.setItem("savedPokeDrinks", JSON.stringify(savedPokeDrinks));
}

//Create function to render the drink's name
function renderName(){
    const drinkTitle = document.querySelector("#cocktail-name")
    const drink = selectedPokeDrink.drink;
    const drinkName = drink.strDrink;
    const drinkh1 = document.createElement('h1');
    drinkh1.textContent = drinkName;
    drinkTitle.appendChild(drinkh1);
}

//function to loop through ingredients and measures and adding them inside the ingredients-list 'ul'
function renderIngredients() {
    const ingredientsList = document.querySelector("#ingredients-list");
    const drink = selectedPokeDrink.drink;

    let i = 1;

    while ((drink[`strIngredient${i}`] !== null || drink[`strMeasure${i}`] !== null) && i < 16) {
        let ingredient = drink[`strIngredient${i}`] || '';
        let measure = ! drink[`strMeasure${i}`] ? '' 
        : drink[`strMeasure${i}`].includes(" of") ? drink[`strMeasure${i}`]
        : drink[`strMeasure${i}`].includes(" with") ? drink[`strMeasure${i}`]
        : `${drink[`strMeasure${i}`]} of ` 
         
        
        if (measure && isNaN(parseInt(measure.charAt(0)))) {
            measure = measure.charAt(0).toUpperCase() + measure.slice(1);
        }

        let ingredientItem = document.createElement('li');
        ingredientItem.textContent = `${measure} ${ingredient}`;
        ingredientsList.appendChild(ingredientItem);
        i++;
    
}
}


//function to extraxt the image from the local storage and adding it inside the cocktail-image div
function loadDrinkImage() {
    const drink = selectedPokeDrink.drink;
    const drinkImage = drink.strDrinkThumb;
    const drinkImageDiv = document.querySelector("#cocktail-image");

    drinkImageDiv.style.backgroundImage = `url('${drinkImage}')`;
}

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
    renderName();
    renderInstructions();
    renderIngredients();
    loadDrinkImage();
    btnSave.addEventListener('click', savePokeDrinkToLocal);
}

window.onload = readyDrinkFunc();