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

window.onload = readyFunc();