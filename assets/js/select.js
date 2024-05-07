const rootEl = document.querySelector(':root'); // A constant for the root element to change te document CSS variables.
const titleLetters = document.querySelectorAll('.letter'); // This selector targets the main title letters.
const showroom = document.querySelector('#showroom');
const pokeNameCard = document.querySelector('#poke-name');
const btnNext = document.querySelector('#btn-next');
const btnBack = document.querySelector('#btn-back');
const btnSelect = document.querySelector('#btn-select');
let pokeList = [];
let pokeArrayForDisplay = [];

// The following func sets a responsive size for the letters and rotates each of them individually. It also creates a hover animation.
const setTitle = () => {
    const bornletters = (letter, i) => {
        let time = 200*i
        setTimeout(() => {
            if (window.innerWidth > 768) letter.style.fontSize = `15vh`
            if (window.innerWidth < 768) letter.style.fontSize = `10vw`
        }, time)
    };

    const animateLetters = (letter) =>{
        letter.style.transform = `rotate(${letter.dataset.rotation}rad)`;
        letter.addEventListener('mouseenter', () => letter.style.transform = `scale(1.2)`);
        letter.addEventListener('mouseleave', () => letter.style.transform = `rotate(${letter.dataset.rotation}rad)`);
    };

    titleLetters.forEach(animateLetters);
    titleLetters.forEach(bornletters);
};

const changeTitleSize = () => {
    const resizeLetters = (letter) => {
        if (window.innerWidth > 768) letter.style.fontSize = `15vh`
        if (window.innerWidth < 768) letter.style.fontSize = `18vw`
    }
    
    titleLetters.forEach(resizeLetters);
};

const changePokemon = (e) => {
    const event = e.target;
    const pokemons = document.querySelectorAll('.pokemon');
    btnNext.removeEventListener('click', changePokemon);
    btnBack.removeEventListener('click', changePokemon);

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
        btnNext.addEventListener('click', changePokemon);
        btnBack.addEventListener('click', changePokemon);
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
        case 5:
            pokemon.style.marginRight = '0';
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

    if (index === 9) fillPokeCard();
};

const renderOnePokemon = (pokemon, i) => {
    const pokemonDiv = document.createElement('div');
    const pokemonImg = document.createElement('img');
    const pokeFxDiv = document.createElement('div');
    const pokeFxInnerDiv = document.createElement('div');
    const pokeGlowImg = document.createElement('img');
    const glowDiv = document.createElement('div');
    const pokeSelected = document.createElement('div');

    pokemonDiv.classList.add('flex', 'flex-col', 'absolute', 'h-4/5', 'pokemon');
    pokemonDiv.dataset.position = i;
    pokemonDiv.dataset.id = pokemon.id;
    pokemonDiv.dataset.gif = pokemon.sprites.other.showdown.front_default;
    pokemonDiv.dataset.name = pokemon.name;
    pokemonDiv.dataset.hp = pokemon.stats[0].base_stat;
    pokemonDiv.dataset.atk = pokemon.stats[1].base_stat;
    pokemonDiv.dataset.def = pokemon.stats[2].base_stat;
    pokemonDiv.dataset.spAtk = pokemon.stats[3].base_stat;
    pokemonDiv.dataset.spDef = pokemon.stats[4].base_stat;
    pokemonDiv.dataset.speed = pokemon.stats[5].base_stat;
    if (pokemon.types.length < 2) {
        pokemonDiv.dataset.typeOne = pokemon.types[0].type.name;
        pokemonDiv.dataset.typeTwo = pokemon.types[0].type.name;
    } else {
        pokemonDiv.dataset.typeOne = pokemon.types[0].type.name;
        pokemonDiv.dataset.typeTwo = pokemon.types[1].type.name;
    }
    
    pokemonImg.classList.add('h-full', 'z-20', 'poke-img');
    pokemonImg.src = pokemon.sprites.other.dream_world.front_default;
    
    pokeFxDiv.classList.add('flex', 'absolute', 'h-full', 'poke-fx');
    if (i === 0) pokeFxDiv.style.opacity = '100%';
    else pokeFxDiv.style.opacity = '0%';
    
    pokeFxInnerDiv.classList.add('flex', 'glow-fx', 'h-full', 'w-full', 'relative', 'z-30');

    pokeGlowImg.src = pokemon.sprites.other.dream_world.front_default;
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
        case 5:
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

    if (i === 9) fillPokeCard(); 
};

const renderPokemons = () => {
    pokeArrayForDisplay.forEach(renderOnePokemon);
};

const fillPokeCard = () => {
    const selectedPoke = document.querySelector('[data-position="0"]');
    const pokeName = document.querySelector('#poke-name');
    const levels = document.querySelectorAll('.level');
    const extras = document.querySelectorAll('.extra');
    const pokeGif = document.querySelector('#poke-gif');
    const pokeGifShadow = document.querySelector('#poke-gif-shadow');
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

    if (name.length > 9) pokeName.style.fontSize = '3.75rem'
    else pokeName.style.fontSize = '4.5rem'
    pokeName.innerText = `${name[0].toUpperCase()}${name.slice(1)}`;
    pokeGif.src = gif;
    pokeGifShadow.src = gif;

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

const getTenPokemons = (index, limit) => {
    let i = index;
    const lim = limit;

    fetch(pokeList[i].url)
        .then(string => string.json())
        .then(obj => pokeArrayForDisplay.push(obj))
        .then(() => {
            i++
            if (i < lim) getTenPokemons(i, lim)
            else {
                renderPokemons();
            }
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

const readyFunc = () => {
    setTitle();
    getPokeListFunc();
    window.addEventListener('resize', changeTitleSize);
    btnNext.addEventListener('click', changePokemon);
    btnBack.addEventListener('click', changePokemon);
};

//Local Storage Pokemon//


btnSelect.addEventListener("click",function(){

    const mainPosition = document.querySelector('[data-position = "0"]');

    const selectedPokemon = {
        name: mainPosition.dataset.name,
        hp: mainPosition.dataset.hp,
        atk: mainPosition.dataset.atk,
        def: mainPosition.dataset.def,
        spAtk: mainPosition.dataset.spAtk,
        spDef: mainPosition.dataset.spDef,
        speed: mainPosition.dataset.speed
    };

    localStorage.setItem("selectedPokemon",JSON.stringify(selectedPokemon));

    console.log("Información almacenada:", selectedPokemon);
})


window.onload = readyFunc();
