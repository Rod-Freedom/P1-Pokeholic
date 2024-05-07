const titleLetters = document.querySelectorAll('.letter'); // This selector targets the main title letters.
const showroom = document.querySelector('#showroom');
let pokeList = [];
let pokeArrayForDisplay = [];

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
        letter.addEventListener('mouseenter', () => {
            letter.style.transform = `scale(1.2)`;
        });
        letter.addEventListener('mouseleave', () => {
            letter.style.transform = `rotate(${letter.dataset.rotation}rad)`;
        });
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

    pokeSelected.classList.add('elected', 'h-1/3', 'w-full', 'absolute', 'z-0');

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
            console.log(i);
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
            console.log(i);
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

    if (i === 9) fillPokeCard; 
    
};

const renderPokemons = () => {
    pokeArrayForDisplay.forEach(renderOnePokemon);
};

const fillPokeCard = () => {
    const selectedPoke = document.querySelector
    // rootEl.style.setProperty('--body-bg', 'rgb(23, 23, 23)');
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
    const getPokeList = 'https://pokeapi.co/api/v2/pokemon?limit=1302';

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
};

//Local Storage Pokemon//

const SelectButton = document.querySelector('#btn-select');
SelectButton.addEventListener("click",function(){

    const selectedPokemon = {
        name: document.getElementById("poke-name").innerText,
        hp: document.getElementById("hp").dataset.hp,
        atk: document.getElementById("atk").dataset.atk,
        def: document.getElementById("def").dataset.def,
        spAtk: document.getElementById("sp-atk").dataset.spAtk,
        spDef: document.getElementById("sp-def").dataset.spDef,
        speed: document.getElementById("speed").dataset.speed
    };

    localStorage.setItem("selectedPokemon",JSON.stringify(selectedPokemon));

    console.log("Información almacenada:", selectedPokemon);
})



window.onload = readyFunc();