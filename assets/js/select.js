const rootEl = document.querySelector(':root'); // A constant for the root element to change te document CSS variables.
const showroom = document.querySelector('#showroom');
const pokeNameCard = document.querySelector('#poke-name');
const btnNext = document.querySelector('#btn-next');
const btnBack = document.querySelector('#btn-back');
const btnSelect = document.querySelector('#btn-select');
const btnsScroller = document.querySelector('#btns-scroller');
const selectorPokeNums = document.querySelector('#poke-num-selector');
const btnsNumber = document.querySelector('#btns-number');
const showroomFloor = document.querySelector('.showroom-floor');
const loadingFilter = document.querySelector('#loading-filter-div');
const pokeCard = document.querySelector('#left-screen');
const drinkCard = document.querySelector('#right-screen');
const drinkName = document.querySelector('#drink-name');
const pokeName = document.querySelector('#poke-name');
const pokeGif = document.querySelector('#poke-gif');
const pokeGifShadow = document.querySelector('#poke-gif-shadow');
const pokeNameMobile = document.querySelector('#poke-name-mobile');
const drinkNameMobile = document.querySelector('#drink-name-mobile');
const pokeGifMobile = document.querySelector('#poke-gif-mobile');
const pokeGifShadowMobile = document.querySelector('#poke-gif-shadow-mobile');

let pokeList = [];
let dataArrayForDisplay = [];
const pokeTypeDrinkRel = {
    normal: 'rum',
    fighting: 'scotch',
    flying: 'vodka',
    poison: 'jagermeister',
    ground: 'kahlua',
    rock: 'beer',
    bug: 'anis',
    ghost: 'amaretto',
    steel: 'dry_vermouth',
    fire: 'tequila',
    water: 'tonic_water',
    grass: 'gin',
    electric: 'passion_fruit_juice',
    psychic: 'angostura_bitters',
    ice: 'mint',
    dragon: 'cachaca',
    dark: 'red_wine',
    fairy: 'absinthe',
    shadow: 'brandy',
};

const mediaQueriesFunc = () => {
    const selectedPoke = document.querySelector('[data-position="0"]');
    const pokeCardHeight = parseInt(getComputedStyle(pokeCard).getPropertyValue('height'));
    const pokeCardWidth = parseInt(getComputedStyle(pokeCard).getPropertyValue('width'));
    const selPokeNameLength = selectedPoke.dataset.name.length;
    const selDrinkNameLength = dataArrayForDisplay[selectedPoke.dataset.arrayPosition].drink.strDrink.length;
    
    pokeGif.style.maxHeight = `${pokeCardHeight * .25}px`;
    pokeGif.style.minHeight = `${pokeCardHeight * .12}px`;
    pokeGifShadow.style.maxHeight = `${pokeCardHeight * .25}px`;
    pokeGifShadow.style.minHeight = `${pokeCardHeight * .12}px`;

    if (window.innerHeight < 952 && window.innerWidth > 1440 && selPokeNameLength < 10) pokeName.style.fontSize = `${pokeCardHeight * .13}px` 
    if (window.innerHeight < 952 && window.innerWidth < 1440 && selPokeNameLength < 10) pokeName.style.fontSize = `${pokeCardHeight * .12}px`
    if (window.innerHeight < 952 && window.innerWidth < 1280 && selPokeNameLength < 10) pokeName.style.fontSize = `${pokeCardHeight * .10}px`
    if (window.innerHeight < 952 && window.innerWidth < 1200 && selPokeNameLength < 10) pokeName.style.fontSize = `${pokeCardHeight * .08}px`
    if (window.innerHeight > 952 && window.innerWidth < 1580 && selPokeNameLength < 10) pokeName.style.fontSize = `${pokeCardWidth * .17}px`
    if (window.innerHeight > 952 && window.innerWidth > 1580 && selPokeNameLength < 10) pokeName.style.fontSize = `4.5rem`
    if (window.innerHeight < 952 && window.innerWidth > 1625 && selPokeNameLength > 9) pokeName.style.fontSize = `${pokeCardHeight * .1}px`
    if (window.innerHeight < 952 && window.innerWidth < 1625 && selPokeNameLength > 9) pokeName.style.fontSize = `${pokeCardHeight * .1}px`
    if (window.innerHeight < 952 && window.innerWidth < 1400 && selPokeNameLength > 9) pokeName.style.fontSize = `${pokeCardHeight * .08}px`
    if (window.innerHeight > 952 && window.innerWidth < 1810 && selPokeNameLength > 9) pokeName.style.fontSize = `${pokeCardWidth * .14}px`
    if (window.innerHeight > 952 && window.innerWidth > 1625 && selPokeNameLength > 9) pokeName.style.fontSize = `4rem`
    
    if (window.innerHeight < 952 && window.innerWidth > 1440 && selDrinkNameLength < 10) drinkName.style.fontSize = `${pokeCardHeight * .13}px` 
    if (window.innerHeight < 952 && window.innerWidth < 1440 && selDrinkNameLength < 10) drinkName.style.fontSize = `${pokeCardHeight * .12}px`
    if (window.innerHeight < 952 && window.innerWidth < 1280 && selDrinkNameLength < 10) drinkName.style.fontSize = `${pokeCardHeight * .10}px`
    if (window.innerHeight < 952 && window.innerWidth < 1200 && selDrinkNameLength < 10) drinkName.style.fontSize = `${pokeCardHeight * .08}px`
    if (window.innerHeight > 952 && window.innerWidth < 1580 && selDrinkNameLength < 10) drinkName.style.fontSize = `${pokeCardWidth * .17}px`
    if (window.innerHeight > 952 && window.innerWidth > 1580 && selDrinkNameLength < 10) drinkName.style.fontSize = `4.5rem`
    if (window.innerHeight < 952 && window.innerWidth > 1625 && selDrinkNameLength > 9) drinkName.style.fontSize = `${pokeCardHeight * .1}px`
    if (window.innerHeight < 952 && window.innerWidth < 1625 && selDrinkNameLength > 9) drinkName.style.fontSize = `${pokeCardHeight * .1}px`
    if (window.innerHeight < 952 && window.innerWidth < 1400 && selDrinkNameLength > 9) drinkName.style.fontSize = `${pokeCardHeight * .08}px`
    if (window.innerHeight > 952 && window.innerWidth < 1810 && selDrinkNameLength > 9) drinkName.style.fontSize = `${pokeCardWidth * .14}px`
    if (window.innerHeight > 952 && window.innerWidth > 1625 && selDrinkNameLength > 9) drinkName.style.fontSize = `4rem`
};

const changePokeGroup = (e) => {
    const event = e.target;
    const index = event.dataset.index;
    const limit = event.dataset.limit;
    const firstPokeInArray = document.querySelector('[data-array-position="0"]');
    const lastIndex = firstPokeInArray.dataset.id - 1;
    const lastSelectedOption = document.querySelector(`[data-index="${lastIndex}"]`);

    dataArrayForDisplay = [];    
    lastSelectedOption.classList.remove('hidden');
    event.classList.add('hidden');
    loadingFilter.classList.remove('hidden');
    loadingFilter.classList.add('flex');
    getTenPokemons(index, limit);
    selectorPokeNums.innerText = event.textContent; 
};

const renderPokeNumOpt = () => {
    const divOptions = document.querySelector('#div-options');
    let start = 1;
    let end = 10;

    selectorPokeNums.innerText = `${start} - ${end}`;

    while (end < 1021)  {
        const option = document.createElement('h3');
        
        if (start === 1) option.classList.add('hidden');
        option.classList.add('text-center', 'rounded-full', 'w-full', 'my-1', 'bg-slate-100/30', 'hover:bg-slate-300/50', 'num-option');
        option.innerText = `${start} - ${end}`;
        option.dataset.index = start - 1;
        option.dataset.limit = end;
        option.addEventListener('click', changePokeGroup)
        divOptions.appendChild(option);
        start+=10;
        end+=10;
    }
};

const changePokemon = (e) => {
    const event = e.target;
    const pokemons = document.querySelectorAll('.pokemon');
    btnsScroller.removeEventListener('click', changePokemon);

    const changeDataPositionUp = (pokemon) => {
        if (pokemon.dataset.position > 8) pokemon.dataset.position = 0
        else pokemon.dataset.position++
    };
    
    const changeDataPositionDown = (pokemon) => {
        if (pokemon.dataset.position < 1) pokemon.dataset.position = 9
        else pokemon.dataset.position--
    };

    if (event.id === 'btn-back') pokemons.forEach(changeDataPositionUp)
    if (event.id === 'btn-next') pokemons.forEach(changeDataPositionDown)

    pokemons.forEach(positionPokemons);

    // The transition of the pokemons for changing position is one second, so this timeout is to prevent consecutive clicking from making a furious pokemons spiral.
    setTimeout(() => {
        btnsScroller.addEventListener('click', changePokemon);
    }, 500)
};

const positionPokemons = (pokemon, index) => {
    const pokeImg = pokemon.querySelector('.poke-img');
    const pokeFxDiv = pokemon.querySelector('.poke-fx');
    const i = Number(pokemon.dataset.position);

    if (i !== 0) {
        pokeImg.classList.remove('poke-back-glow');
        pokeFxDiv.style.opacity = '0';
    }
    if (i === 0) {
        pokemon.style.zIndex = '6';
        pokemon.style.marginBottom = '-3%';
        pokeImg.classList.add('poke-back-glow');
        pokemon.style.filter = 'none';
        pokeFxDiv.style.opacity = '1';
        pokemon.style.transform = 'scale(1)';
    }         
    if (i === 1 || i === 9) {
        pokemon.style.zIndex = '5';
        pokemon.style.marginBottom = '-5%';
        pokemon.style.transform = 'scale(.7)';
        pokemon.style.filter = 'grayscale() brightness(20%)';
    }
    if (i === 2 || i === 8) { 
        pokemon.style.zIndex = '4';
        pokemon.style.marginBottom = '-2%';
        pokemon.style.transform = 'scale(.6)';
        pokemon.style.filter = 'grayscale() brightness(15%)';
    }
    if (i === 3 || i === 7) {
        pokemon.style.zIndex = '3';
        pokemon.style.marginBottom = '4%';
        pokemon.style.transform = 'scale(.5)';
        pokemon.style.filter = 'grayscale() brightness(12%)';
    }
    if (i === 4 || i === 6) {
        pokemon.style.zIndex = '2';
        pokemon.style.marginBottom = '3%';
        pokemon.style.transform = 'scale(.4)';
        pokemon.style.filter = 'grayscale() brightness(10%)';
    }
    if (i === 5) {
        pokemon.style.zIndex = '1';
        pokemon.style.marginBottom = '3%';
        pokemon.style.transform = 'scale(.3)';
        pokemon.style.filter = 'grayscale() brightness(5%)';
    }
    
    switch (i) {
        case 0:
        case 5:
            pokemon.style.marginRight = '0';
            pokemon.style.marginLeft = '0';
            break
        case 1:
            pokemon.style.marginRight = 'calc(-26vw - 50%)';
            pokemon.style.marginLeft = '0';
            break
        case 2:
            pokemon.style.marginRight = 'calc(-46vw - 50%)';
            pokemon.style.marginLeft = '0';
            break
        case 3:
            pokemon.style.marginRight = 'calc(-32vw - 50%)';
            pokemon.style.marginLeft = '0';
            break
        case 4:
            pokemon.style.marginRight = 'calc(-12vw - 50%)';
            pokemon.style.marginLeft = '0';
            break
        case 6:
            pokemon.style.marginLeft = 'calc(-12vw - 50%)';
            pokemon.style.marginRight = '0';
            break
        case 7:
            pokemon.style.marginLeft = 'calc(-32vw - 50%)';
            pokemon.style.marginRight = '0';
            break
        case 8:
            pokemon.style.marginLeft = 'calc(-46vw - 50%)';
            pokemon.style.marginRight = '0';
            break
        case 9:
            pokemon.style.marginLeft = 'calc(-26vw - 50%)';
            pokemon.style.marginRight = '0';
            break
    }

    if (index === 9) fillSideCards();
};

const renderOnePokemon = (dataObj, i) => {
    const pokemon = dataObj.pokemon;
    const pokemonDiv = document.createElement('div');
    const pokemonImg = document.createElement('img');
    const pokeFxDiv = document.createElement('div');
    const pokeFxInnerDiv = document.createElement('div');
    const pokeGlowImg = document.createElement('img');
    const glowDiv = document.createElement('div');
    const pokeSelected = document.createElement('div');

    pokemonDiv.classList.add('flex', 'flex-col', 'h-4/5', 'pokemon');
    pokemonDiv.dataset.position = i;
    pokemonDiv.dataset.arrayPosition = i;
    pokemonDiv.dataset.id = pokemon.id;
    pokemonDiv.dataset.gif = pokemon.sprites.other.showdown.front_default ? pokemon.sprites.other.showdown.front_default : pokemon.sprites.other['official-artwork'].front_default;
    pokemonDiv.dataset.name = pokemon.name;
    pokemonDiv.dataset.hp = pokemon.stats[0].base_stat;
    pokemonDiv.dataset.atk = pokemon.stats[1].base_stat;
    pokemonDiv.dataset.def = pokemon.stats[2].base_stat;
    pokemonDiv.dataset.spAtk = pokemon.stats[3].base_stat;
    pokemonDiv.dataset.spDef = pokemon.stats[4].base_stat;
    pokemonDiv.dataset.speed = pokemon.stats[5].base_stat;
    pokemonDiv.dataset.speed = pokemon.stats[5].base_stat;
    if (pokemon.types.length < 2) {
        pokemonDiv.dataset.typeOne = pokemon.types[0].type.name;
        pokemonDiv.dataset.typeTwo = pokemon.types[0].type.name;
    } else {
        pokemonDiv.dataset.typeOne = pokemon.types[0].type.name;
        pokemonDiv.dataset.typeTwo = pokemon.types[1].type.name;
    }
    
    pokemonImg.classList.add('h-full', 'z-20', 'poke-img');
    pokemonImg.src = pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other['official-artwork'].front_default;
    
    pokeFxDiv.classList.add('flex', 'absolute', 'h-full', 'poke-fx');
    if (i === 0) pokeFxDiv.style.opacity = '100%';
    else pokeFxDiv.style.opacity = '0%';
    
    pokeFxInnerDiv.classList.add('flex', 'glow-fx', 'h-full', 'w-full', 'relative', 'z-30');

    pokeGlowImg.src = pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other['official-artwork'].front_default;
    pokeGlowImg.classList.add('poke-glow', 'h-full', 'z-20');

    glowDiv.classList.add('glow', 'absolute', 'w-full', 'h-2/3');

    pokeSelected.classList.add('selected', 'h-1/3', 'w-full', 'absolute', 'z-0');

    pokemonDiv.appendChild(pokemonImg);
    pokemonDiv.appendChild(pokeFxDiv);
    pokeFxDiv.appendChild(pokeFxInnerDiv);
    pokeFxDiv.appendChild(pokeSelected);
    pokeFxInnerDiv.appendChild(pokeGlowImg);
    pokeFxInnerDiv.appendChild(glowDiv);
    showroom.appendChild(pokemonDiv);

    if (i === 0) {
        pokemonDiv.style.zIndex = '6';
        pokemonDiv.style.marginBottom = '-3%';
        pokemonImg.classList.add('poke-back-glow');
    }         
    if (i === 1 || i === 9) {
        pokemonDiv.style.zIndex = '5';
        pokemonDiv.style.marginBottom = '-5%';
        pokemonDiv.style.transform = 'scale(.7)';
        pokemonDiv.style.filter = 'grayscale() brightness(20%)';
    }
    if (i === 2 || i === 8) { 
        pokemonDiv.style.zIndex = '4';
        pokemonDiv.style.marginBottom = '-2%';
        pokemonDiv.style.transform = 'scale(.6)';
        pokemonDiv.style.filter = 'grayscale() brightness(15%)';
    }
    if (i === 3 || i === 7) {
        pokemonDiv.style.zIndex = '3';
        pokemonDiv.style.marginBottom = '4%';
        pokemonDiv.style.transform = 'scale(.5)';
        pokemonDiv.style.filter = 'grayscale() brightness(12%)';
    }
    if (i === 4 || i === 6) {
        pokemonDiv.style.zIndex = '2';
        pokemonDiv.style.marginBottom = '3%';
        pokemonDiv.style.transform = 'scale(.4)';
        pokemonDiv.style.filter = 'grayscale() brightness(10%)';
    }
    if (i === 5) {
        pokemonDiv.style.zIndex = '1';
        pokemonDiv.style.marginBottom = '3%';
        pokemonDiv.style.transform = 'scale(.3)';
        pokemonDiv.style.filter = 'grayscale() brightness(5%)';
    }
    
    switch (i) {
        case 0:
        case 5:
            break
        case 1:
            pokemonDiv.style.marginRight = 'calc(-26vw - 50%)';
            break
        case 2:
            pokemonDiv.style.marginRight = 'calc(-46vw - 50%)';
            break
        case 3:
            pokemonDiv.style.marginRight = 'calc(-32vw - 50%)';
            break
        case 4:
            pokemonDiv.style.marginRight = 'calc(-12vw - 50%)';
            break
        case 6:
            pokemonDiv.style.marginLeft = 'calc(-12vw - 50%)';
            break
        case 7:
            pokemonDiv.style.marginLeft = 'calc(-32vw - 50%)';
            break
        case 8:
            pokemonDiv.style.marginLeft = 'calc(-46vw - 50%)';
            break
        case 9:
            pokemonDiv.style.marginLeft = 'calc(-26vw - 50%)';
            break
    }

    if (i === 9) fillSideCards(); 
};

const renderData = () => {
    getTenDrinks().then(() => {
        showroom.replaceChildren();
        dataArrayForDisplay.forEach(renderOnePokemon);
    })
};

const fillDrinkCard = () => {
    const selectedPoke = document.querySelector('[data-position="0"]');
    drinkCard.classList.remove('animate-pulse');
    const drinkIcon = document.querySelector('#drink-icon');
    const diffLvBar = drinkCard.querySelectorAll('.level')[0];
    const ingredBar = drinkCard.querySelectorAll('.level')[1];
    const diffLvExtra = drinkCard.querySelectorAll('.extra')[0];
    const ingredExtra = drinkCard.querySelectorAll('.extra')[1];
    const index = selectedPoke.dataset.arrayPosition;
    const drinkObj = dataArrayForDisplay[index].drink;
    if (drinkObj === '') return
    const glassType = drinkObj.strGlass.toLowerCase();
    const name = drinkObj.strDrink;
    const diffLv = Math.round((dataArrayForDisplay[index].drink.strInstructions.length / 500) * 100);
    let ingred = 0;
    
    const glassIconReactor = () => {
        drinkIcon.className = 'text-7xl mb-7 mt-4';

        if (glassType.includes('beer mug')) return drinkIcon.classList.add('fa-sharp', 'fa-solid', 'fa-beer-mug')
        else if (glassType.includes('cocktail')) return drinkIcon.classList.add('fa-solid', 'fa-martini-glass')
        else if (glassType.includes('cordial')) return drinkIcon.classList.add('fa-solid', 'fa-champagne-glass')
        else if (glassType.includes('pilsner')) return drinkIcon.classList.add('fa-solid', 'fa-glass')
        else if (glassType.includes('whiskey')) return drinkIcon.classList.add('fa-solid', 'fa-whiskey-glass')
        else if (glassType.includes('old-fashioned glass')) return drinkIcon.classList.add('fa-solid', 'fa-whiskey-glass-ice')
        else if (glassType.includes('cup')) return drinkIcon.classList.add('fa-solid', 'fa-mug')
        else if (glassType.includes('mug')) return drinkIcon.classList.add('fa-solid', 'fa-mug')
        else if (glassType.includes('glass')) return drinkIcon.classList.add('fa-solid', 'fa-glass')
        else return drinkIcon.classList.add('fa-solid', 'fa-glass-citrus')
    };

    const ingredCounter = () => {
        let i = 1;
        while (dataArrayForDisplay[index].drink[`strIngredient${i}`] !== null) {
            i++
            ingred++
        }
    };

    drinkName.innerText = name;
    drinkNameMobile.innerText = name;

    const setBarLevels = () => {
        if (diffLv > 100) {
            diffLvBar.style.width = `100%`;
            diffLvExtra.innerText = `+${diffLv - 100}%`;
            diffLvBar.style.backgroundColor = 'rgb(96, 165, 250)';
        } else {
            diffLvBar.style.width = `${diffLv}%`;
            diffLvExtra.innerText = '';
            diffLvBar.style.backgroundColor = 'rgb(134, 239, 172)';
        }

        if (ingred > 5) {
            ingredBar.style.width = `100%`;
            ingredExtra.innerText = `+${(ingred - 5)}`;
            ingredBar.style.backgroundColor = 'rgb(96, 165, 250)';
        } else {
            ingredBar.style.width = `${ingred * 20}%`;
            ingredExtra.innerText = '';
            ingredBar.style.backgroundColor = 'rgb(134, 239, 172)';
        }
    };

    glassIconReactor();
    ingredCounter();
    setBarLevels();
};

const fillPokeCard = () => {
    const selectedPoke = document.querySelector('[data-position="0"]');
    pokeCard.classList.remove('animate-pulse');
    const levels = pokeCard.querySelectorAll('.level');
    const extras = pokeCard.querySelectorAll('.extra');
    const dataTypeOne = selectedPoke.dataset.typeOne;
    const dataTypeTwo = selectedPoke.dataset.typeTwo;
    const gif = selectedPoke.dataset.gif;
    const name = selectedPoke.dataset.name;
    const statsArray = [
        selectedPoke.dataset.hp,
        selectedPoke.dataset.atk,
        selectedPoke.dataset.def,
        selectedPoke.dataset.spAtk,
        selectedPoke.dataset.spDef,
        selectedPoke.dataset.speed,
    ];

    pokeName.innerText = `${name[0].toUpperCase()}${name.slice(1)}`;
    pokeNameMobile.innerText = `${name[0].toUpperCase()}${name.slice(1)}`;
    pokeGif.src = gif;
    pokeGifShadow.src = gif;
    pokeGifMobile.src = gif;
    pokeGifShadowMobile.src = gif;

    const setBarLevels = (bar, i) => {
        if (statsArray[i] > 100) {
            bar.style.width = `100%`;
            extras[i].innerText = `+${statsArray[i] - 100}%`;
            bar.style.backgroundColor = 'rgb(96, 165, 250)';
        } else {
            bar.style.width = `${statsArray[i]}%`;
            bar.style.backgroundColor = 'rgb(134, 239, 172)';
            extras[i].innerText = '';
        }
    };

    levels.forEach(setBarLevels);

    // For the left card color scheme. Changes depending on the pokemon type.
    rootEl.style.setProperty(`--light-poketype-color`, `var(--light-poketype-color-${dataTypeOne})`);
    rootEl.style.setProperty(`--dark-poketype-color`, `var(--dark-poketype-color-${dataTypeOne})`);
    rootEl.style.setProperty(`--light-poketype-color-editable`, `var(--light-poketype-color-editable-${dataTypeOne})`);
    rootEl.style.setProperty(`--dark-poketype-color-editable`, `var(--dark-poketype-color-editable-${dataTypeOne})`);
    rootEl.style.setProperty(`--poketype-color-1`, `var(--poketype-color-1-${dataTypeOne})`);
    rootEl.style.setProperty(`--poketype-color-2`, `var(--poketype-color-2-${dataTypeOne})`);
    rootEl.style.setProperty(`--poketype-color-3`, `var(--poketype-color-3-${dataTypeOne})`);
    rootEl.style.setProperty(`--poketype-color-4`, `var(--poketype-color-4-${dataTypeOne})`);
    rootEl.style.setProperty(`--poketype-color-5`, `var(--poketype-color-5-${dataTypeOne})`);
    
    // For the right card color scheme. Changes depending on the pokemon type.
    rootEl.style.setProperty(`--light-poketype-color-2`, `var(--light-poketype-color-${dataTypeTwo})`);
    rootEl.style.setProperty(`--dark-poketype-color-2`, `var(--dark-poketype-color-${dataTypeTwo})`);
    rootEl.style.setProperty(`--light-poketype-color-editable-2`, `var(--light-poketype-color-editable-${dataTypeTwo})`);
    rootEl.style.setProperty(`--dark-poketype-color-editable-2`, `var(--dark-poketype-color-editable-${dataTypeTwo})`);
    rootEl.style.setProperty(`--poketype-color-1-2`, `var(--poketype-color-1-${dataTypeTwo})`);
    rootEl.style.setProperty(`--poketype-color-2-2`, `var(--poketype-color-2-${dataTypeTwo})`);
    rootEl.style.setProperty(`--poketype-color-3-2`, `var(--poketype-color-3-${dataTypeTwo})`);
    rootEl.style.setProperty(`--poketype-color-4-2`, `var(--poketype-color-4-${dataTypeTwo})`);
    rootEl.style.setProperty(`--poketype-color-5-2`, `var(--poketype-color-5-${dataTypeTwo})`);
};

const fillSideCards = () => {
    btnsScroller.parentElement.classList.remove('animate-pulse');
    btnsNumber.classList.remove('animate-pulse');
    showroomFloor.classList.remove('animate-pulse');
    loadingFilter.classList.remove('flex');
    loadingFilter.classList.add('hidden');
    fillPokeCard();
    fillDrinkCard();
    mediaQueriesFunc();
};

const getTenDrinks = () => { return new Promise((res, rej) => {
    let index = 0;
    let limit = dataArrayForDisplay.length;
    
    const getDrinkObjs = (i, lim) => {
        const dataObj = dataArrayForDisplay[i];
        const pokeName = dataObj.pokemon.name;
        const ingredOne = `${pokeTypeDrinkRel[`${dataObj.pokemon.types[0].type.name}`]}`;
        const ingredTwo = dataObj.pokemon.types[1] ? `,${pokeTypeDrinkRel[`${dataObj.pokemon.types[1].type.name}`]}` : '';
        const twoIngredUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredOne}${ingredTwo}`;
        const oneIngredUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredOne}`;
        const randomDrinkUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/random.php`;
        const empellonUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=17246';
        const piscoSourUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=13214';
        const coffeeVodkaUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=12800';
        const ramosGinFizzUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=178367';

        
        const fetchDrink = (drinksObj) => {
            const randomDrink = drinksObj.drinks[Math.floor(Math.random() * drinksObj.drinks.length)]
            const randomDrinkId = randomDrink.idDrink
            const drinkIdUrl = pokeName === 'arceus' ? ramosGinFizzUrl
                : pokeName === 'mewtwo' ? empellonUrl
                : pokeName === 'dialga' ? coffeeVodkaUrl
                : pokeName === 'pikachu' ? piscoSourUrl
                : `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${randomDrinkId}`
            ;

            if (randomDrink.strDrink === "Bora Bora" || randomDrink.strDrink === "Ipanema") return fetchDrink(drinksObj);
            else {
                fetch(drinkIdUrl)
                    .then(string => string.json())
                    .then(drinkObj => {
                        if (drinkObj.drinks[0].strAlcoholic !== 'Alcoholic') return fetchDrink(drinksObj);
                        else dataArrayForDisplay[i].drink = drinkObj.drinks[0]
                    })
                    .then(() => {
                        i++
                        if (i < lim) getDrinkObjs(i, lim)
                        else {
                            res();
                        }
                    })
                    .catch((err) => console.log(err))
            }
        };

        const fetchRandom = () => {
            fetch(randomDrinkUrl)
            .then(drinkObj => {
                if (drinkObj.drinks[0].strAlcoholic !== 'Alcoholic') return fetchRandom();
                else dataArrayForDisplay[i].drink = drinkObj.drinks[0]
            })
            .then(() => {
                i++
                if (i < lim) getDrinkObjs(i, lim)
                else {
                    res();
                }
            })
                .catch((error) => console.log(error))
        };

        const fetchOneIngred = () => {
            fetch(oneIngredUrl)
                .then(string => string.json())
                .then(drinksObj => {
                    if (drinksObj.drinks === 'None Found') fetchRandom()
                    else fetchDrink(drinksObj)
                })
                .catch((error) => console.log(error))
        };
    
        const fetchTwoIngred = () => {
            fetch(twoIngredUrl)
                .then(string => string.json())
                .then(drinksObj => {
                    if (drinksObj.drinks === 'None Found') fetchOneIngred()
                    else fetchDrink(drinksObj)
                })
                .catch((error) => console.log(error))
        };
        
        fetchTwoIngred();
    }
    
    getDrinkObjs(index, limit);
})};

const getTenPokemons = (index, limit) => {
    let i = index;
    const lim = limit;
    let dataObj = { pokemon: {}, drink: {} }
    loadingFilter.classList.remove('hidden');
    loadingFilter.classList.add('flex');

    fetch(pokeList[i].url)
        .then(string => string.json())
        .then(pokeObj => {
            const pokemon = dataObj.pokemon;
            pokemon.id = pokeObj.id;
            pokemon.name = pokeObj.name;
            pokemon.sprites = {};
            pokemon.sprites.other = pokeObj.sprites.other;
            pokemon.stats = pokeObj.stats;
            pokemon.types = pokeObj.types;
            dataArrayForDisplay.push(dataObj);
        })
        .then(() => {
            i++
            if (i < lim) getTenPokemons(i, lim)
            else renderData();
        })
        .catch((error) => console.log(error))
};

const getPokeListFunc = () => {
    const getPokeList = 'https://pokeapi.co/api/v2/pokemon?limit=1025';

    fetch(getPokeList)
        .then(string => string.json())
        .then(obj => pokeList = obj.results)
        .then(() => getTenPokemons(0, 10))
        .catch(() => console.log('An error has been found'))
};

const selectPokeDrink = () => {
    const selectedPokeDrink = document.querySelector('[data-position="0"]');
    const arrayPosition = selectedPokeDrink.dataset.arrayPosition;
    const pokeDrinkObj = dataArrayForDisplay[arrayPosition];
    
    localStorage.setItem('selectedPokeDrink', JSON.stringify(pokeDrinkObj));
    window.location.href = 'drink.html';
};

const readySelectFunc = () => {
    getPokeListFunc();
    renderPokeNumOpt();
    window.addEventListener('resize', mediaQueriesFunc);
    btnsScroller.addEventListener('click', changePokemon);
    btnSelect.addEventListener('click', selectPokeDrink);
};

window.onload = readySelectFunc();