const titleLetters = document.querySelectorAll('.letter'); // This selector targets the main title letters.
const boozeDexWindow = document.querySelector('#booze-dex-window');
const btnDex = document.querySelector('#btn-dex');
const btnCloseDex = document.querySelector('#btn-close-bd');


// The following function sets a responsive size for the letters and rotates each of them individually. It also creates a hover animation.
const setTitle = () => {
    let i = 0;
    // A function that animates the popping of the letters from 0 font-size to something depending on the screen size.
    const bornletters = () => {
        if (window.innerWidth > 768) titleLetters[i].style.fontSize = `15vh`
        if (window.innerWidth < 768) titleLetters[i].style.fontSize = `18vw`
        
        i++;
        if (i === titleLetters.length) clearInterval(bornLettersInterval)
    };
    
    const bornLettersInterval = setInterval(bornletters, 200);

    const animateLetters = (letter) =>{
        letter.style.transform = `rotate(${letter.dataset.rotation}rad)`;
        letter.addEventListener('mouseenter', () => letter.style.transform = `scale(1.2)`);
        letter.addEventListener('mouseleave', () => letter.style.transform = `rotate(${letter.dataset.rotation}rad)`);
    };

    titleLetters.forEach(animateLetters);
};

const changeTitleSize = () => {
    const resizeLetters = (letter) => {
        if (window.innerWidth > 768) letter.style.fontSize = `15vh`
        if (window.innerWidth < 768) letter.style.fontSize = `18vw`
    }
    
    titleLetters.forEach(resizeLetters);
};

const closeBoozeDex = () => {
    boozeDexWindow.style.transform = 'scale(.1)';
    setTimeout(() => boozeDexWindow.style.display = 'none', 200)
};

const openBoozeDex = () => {
    boozeDexWindow.style.display = 'flex';
    setTimeout(() => boozeDexWindow.style.transform = 'scale(1)')
};

const readyFunc = () => {
    setTitle();
    window.addEventListener('resize', changeTitleSize);
    btnDex.addEventListener('click', openBoozeDex);
    btnCloseDex.addEventListener('click', closeBoozeDex);
};

window.onload = readyFunc();