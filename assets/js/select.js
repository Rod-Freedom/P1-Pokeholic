const titleLetters = document.querySelectorAll('.letter'); // This selector targets the main title letters.
let pokeList = [];
let pokeArrayForDisplay = [];

const setTitle = () => {
    const bornletters = (letter, i) => {
        let time = 200*i
        setTimeout(() => {
            letter.style.fontSize = `calc(3rem + 5vw)`;
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

const readyFunc = () => {
    setTitle();
    getPokeListFunc();
};

const renderPokeSelector = () => {
    console.log(pokeArrayForDisplay);
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
            else return renderPokeSelector()
        })
        .catch(() => console.log('An error has been found'))
};

const getPokeListFunc = () => {
    const getPokeList = 'https://pokeapi.co/api/v2/pokemon?limit=1302';

    fetch(getPokeList)
        .then(string => string.json())
        .then(obj => pokeList = obj.results)
        .then(() => getTenPokemons(0, 10))
        .catch(() => console.log('An error has been found'))
};

window.onload = readyFunc();