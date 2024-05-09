const titleLetters = document.querySelectorAll('.letter'); // This selector targets the main title letters.


// The following function sets a responsive size for the letters and rotates each of them individually. It also creates a hover animation.
const setTitle = () => {
    let i = 0;
    // A function that animates the popping of the letters from 0 font-size to something depending on the screen size.
    const bornletters = () => {
        if (window.innerWidth > 768) titleLetters[i].style.fontSize = `15vh`
        if (window.innerWidth < 768) titleLetters[i].style.fontSize = `10vw`
        
        i++;
        if (i === titleLetters.length) clearInterval(bornLettersInterval)
    };
    
    const bornLettersInterval = setInterval(bornletters, 200);
        
    // let time = 200*i; // This time is set based on the transitions of the letters' animation.
    // setTimeout(() => {
    //     if (window.innerWidth > 768) letter.style.fontSize = `15vh`
    //     if (window.innerWidth < 768) letter.style.fontSize = `10vw`
    // }, time); // Each letter in the loop will wait for the past letters to finish the animation transition.

    const animateLetters = (letter) =>{
        letter.style.transform = `rotate(${letter.dataset.rotation}rad)`;
        letter.addEventListener('mouseenter', () => letter.style.transform = `scale(1.2)`);
        letter.addEventListener('mouseleave', () => letter.style.transform = `rotate(${letter.dataset.rotation}rad)`);
    };

    titleLetters.forEach(animateLetters);
    // titleLetters.forEach(bornletters);
};

const changeTitleSize = () => {
    const resizeLetters = (letter) => {
        if (window.innerWidth > 768) letter.style.fontSize = `15vh`
        if (window.innerWidth < 768) letter.style.fontSize = `18vw`
    }
    
    titleLetters.forEach(resizeLetters);
};