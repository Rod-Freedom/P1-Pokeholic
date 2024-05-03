const titleLetters = document.querySelectorAll('.letter'); // This selector targets the main title letters.

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
};

// API Pokemon

function getPokemonData(){
    const apiURLPokemon = `https://pokeapi.co/api/v2/pokemon?limit=1302`;

    return fetch(apiURLPokemon)
    .then(response => response.json())
    .then (data => {

        const PokemonData = data.results;
        return PokemonData;
    })
    .catch(error =>{
        console.log("Error al obtener datos",error);
        throw error;
    });
} 
let PokemonList = [];

getPokemonData()
    .then(PokemonData => {
        let i = 0
        setInterval(()=> {
            if (i > 99) return
            fetch(PokemonData[i].url)
            .then (response => response.json())
            .then (data => 
                {console.log(data) 
                    i++})
        },10)

    });


window.onload = readyFunc();