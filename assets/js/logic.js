const titleLetters = document.querySelectorAll('.letter'); // This selector targets the main title letters.
const btnDex = document.querySelector('#btn-dex');
let localSavesArray = [];

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
        letter.addEventListener('click', () => window.location.href = 'index.html');
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

const getLocalSaves = () => {
    if (localStorage.getItem('savedPokeDrinks')) {
        localSavesArray = JSON.parse(localStorage.getItem('savedPokeDrinks'));
        renderSaves();
    }
};

const deleteSave = (e) => {
    const event = e.target;
    const i = event.dataset.index;

    if (localSavesArray.length === 1) {
        localSavesArray = [];
        localStorage.setItem('savedPokeDrinks', JSON.stringify(localSavesArray));
    } else {
        localSavesArray.splice(i, 1);
        localStorage.setItem('savedPokeDrinks', JSON.stringify(localSavesArray));
    }
    
    renderSaves();
};

const selectSave = (e) => {
    const event = e.target;
    const i = event.dataset.index;

    const pokeDrinkObj = localSavesArray[i];
    
    localStorage.setItem('selectedPokeDrink', JSON.stringify(pokeDrinkObj));
    window.location.href = 'drink.html';
};

const renderOneSave = (dataObj, i) => {
    const pokemon = dataObj.pokemon
    const drink = dataObj.drink
    const pokeImgUrl = pokemon.sprites.other['official-artwork'].front_default;
    const typeOne = dataObj.pokemon.types[0].type.name;
    const typeTwo = dataObj.pokemon.types[1] ? dataObj.pokemon.types[1].type.name : dataObj.pokemon.types[0].type.name;
    const savesCont = document.querySelector('#saves');
    const save = document.createElement('div');
    const saveIcon = document.createElement('div');
    const savePokeImg = document.createElement('div');
    const saveDrinkImg = document.createElement('div');
    const saveH1 = document.createElement('h1');
    const savePokeName = document.createElement('span');
    const saveDrinkName = document.createElement('span');
    const btnsDiv = document.createElement('div');
    const btnSelectSave = document.createElement('i');
    const btnDeleteSave = document.createElement('i');
    
    savesCont.appendChild(save);
    save.appendChild(saveIcon);
    save.appendChild(btnsDiv);
    btnsDiv.appendChild(btnSelectSave);
    btnsDiv.appendChild(btnDeleteSave);
    saveIcon.appendChild(savePokeImg);
    saveIcon.appendChild(saveDrinkImg);
    save.appendChild(saveH1);
    saveH1.appendChild(savePokeName);
    saveH1.appendChild(saveDrinkName);

    save.classList.add('save', 'w-32', 'my-3', 'mx-5', 'relative');
    saveIcon.classList.add('flex', 'justify-center', 'items-center', 'save-icon', 'h-32', 'w-32', 'relative');
    savePokeImg.classList.add('svd-poke-img', 'h-full', 'w-full', 'z-50');
    saveDrinkImg.classList.add('svd-drink-img', 'h-full', 'w-full', 'z-40', 'absolute');
    saveH1.classList.add('flex', 'flex-col', 'save-name', 'text-center', 'pt-3', 'font-bold', 'w-full');
    savePokeName.classList.add('save-poke-name', 'pb-1');
    saveDrinkName.classList.add('save-drink-name', 'pt-1', 'px-1');
    
    btnsDiv.classList.add('hidden', 'flex-row', 'justify-center', 'items-center', 'h-32', 'w-32', 'absolute', 'top-0', 'z-50');
    btnDeleteSave.classList.add('fa-sharp', 'fa-solid', 'fa-xmark', 'text-slate-100', 'aspect-square', 'h-8', 'text-xl', 'flex', 'justify-center', 'items-center', 'mx-1', 'bg-red-500', 'rounded-full');
    btnSelectSave.classList.add('fa-sharp', 'fa-solid', 'fa-check', 'text-slate-100', 'aspect-square', 'h-8', 'text-xl', 'flex', 'justify-center', 'items-center', 'mx-1', 'bg-green-500', 'rounded-full');
    btnDeleteSave.id = 'btn-delete-save';
    btnSelectSave.id = 'btn-select-save';
    btnDeleteSave.dataset.index = i;
    btnSelectSave.dataset.index = i;
    btnDeleteSave.addEventListener('click', deleteSave);
    btnSelectSave.addEventListener('click', selectSave);
    save.addEventListener('mouseenter', () => {
        btnsDiv.classList.remove('hidden');
        btnsDiv.classList.add('flex');
        saveIcon.style.filter = 'brightness(.5)';
    });
    save.addEventListener('mouseleave', () => {
        btnsDiv.classList.add('remove');
        btnsDiv.classList.add('hidden');
        saveIcon.style.filter = 'brightness(1)';
    });

    saveIcon.style.background = `linear-gradient(315deg, var(--dark-poketype-color-${typeOne}) 50%, var(--light-poketype-color-${typeOne}) 50%)`;
    saveIcon.style.borderTop = `.5rem solid var(--dark-poketype-color-${typeOne})`;
    saveIcon.style.borderLeft = `.5rem solid var(--dark-poketype-color-${typeOne})`;
    saveIcon.style.borderBottom = `.5rem solid var(--light-poketype-color-${typeOne})`;
    saveIcon.style.borderRight = `.5rem solid var(--light-poketype-color-${typeOne})`;
    saveIcon.style.boxShadow = 
        `-1.5px -1.5px 0 rgb(255, 255, 255),
        0 -.5rem 0 var(--light-poketype-color-${typeOne}),
        -.5rem -.5rem 0 var(--light-poketype-color-${typeOne}),
        -.5rem 0 0 var(--light-poketype-color-${typeOne}),
        -.5rem .5rem 0 var(--dark-poketype-color-${typeOne}),
        -.5rem .5rem 0 var(--light-poketype-color-${typeOne}),
        .5rem .5rem 0 var(--dark-poketype-color-${typeOne}),
        .5rem -.5rem 0 var(--dark-poketype-color-${typeOne})`
    ;

    savePokeImg.style.background = `url(${pokeImgUrl})`;
    savePokeImg.style.backgroundSize = `cover`;
    savePokeImg.style.filter = `drop-shadow(1px 1px 4px var(--light-poketype-color-${typeOne})) drop-shadow(1px 1px 4px var(--light-poketype-color-${typeOne}))`;
    saveDrinkImg.style.background = `url(${drink.strDrinkThumb})`;
    saveDrinkImg.style.backgroundSize = `cover`;

    savePokeName.innerText = pokemon.name;
    savePokeName.style.color = `var(--light-poketype-color-${typeOne})`;
    savePokeName.style.textShadow =
        `2.2px 2.2px 0 var(--poketype-color-5-${typeOne}),
        2.2px -2.2px 0 var(--poketype-color-5-${typeOne}),
        2.2px 0 0 var(--poketype-color-5-${typeOne}),
        -2.2px 2.2px 0 var(--poketype-color-5-${typeOne}),
        -2.2px -2.2px 0 var(--poketype-color-5-${typeOne}),
        -2.2px 0 0 var(--poketype-color-5-${typeOne}),
        0 2.2px 0 var(--poketype-color-5-${typeOne}),
        0 -2.2px 0 var(--poketype-color-5-${typeOne})`
    ;

    saveDrinkName.innerText = drink.strDrink;
    saveDrinkName.style.color = `var(--light-poketype-color-${typeTwo})`;
    saveDrinkName.style.textShadow =
        `2.2px 2.2px 0 var(--poketype-color-5-${typeTwo}),
        2.2px -2.2px 0 var(--poketype-color-5-${typeTwo}),
        2.2px 0 0 var(--poketype-color-5-${typeTwo}),
        -2.2px 2.2px 0 var(--poketype-color-5-${typeTwo}),
        -2.2px -2.2px 0 var(--poketype-color-5-${typeTwo}),
        -2.2px 0 0 var(--poketype-color-5-${typeTwo}),
        0 2.2px 0 var(--poketype-color-5-${typeTwo}),
        0 -2.2px 0 var(--poketype-color-5-${typeTwo})`
    ;
}

const renderSaves = () => {
    const savesDiv = document.querySelector('#saves');
    savesDiv.replaceChildren();
    localSavesArray.forEach(renderOneSave);
}

const renderBoozeDex = () => {
    const boozeDexWindow = document.createElement('section');
    const boozeDexTopBar = document.createElement('div');
    const btnCloseDex = document.createElement('i');
    const savesDiv = document.createElement('div');
    const bdHeader = document.createElement('div');
    const bdIcon = document.createElement('i');
    const bdTitle = document.createElement('h1');
    const saves = document.createElement('div');
    
    boozeDexWindow.appendChild(boozeDexTopBar);
    boozeDexWindow.appendChild(savesDiv);
    boozeDexTopBar.appendChild(btnCloseDex);
    savesDiv.appendChild(bdHeader);
    bdHeader.appendChild(bdIcon);
    bdHeader.appendChild(bdTitle);
    savesDiv.appendChild(saves);
    
    boozeDexWindow.id = 'booze-dex-window';
    boozeDexTopBar.id = 'saved-div-bar';
    btnCloseDex.id = 'btn-close-bd';
    savesDiv.id = 'saves-div';
    bdHeader.id = 'bd-header';
    saves.id = 'saves';
    bdTitle.innerText = 'Booze-Dex';
    
    boozeDexWindow.classList.add('absolute', 'flex-col', 'self-center', 'rounded-xl');
    boozeDexTopBar.classList.add('w-full', 'h-8', 'flex', 'justify-end', 'items-center', 'px-5');
    btnCloseDex.classList.add('fa-sharp', 'fa-solid', 'fa-xmark', 'flex', 'justify-center', 'items-center', 'rounded-full', 'h-5');
    savesDiv.classList.add('flex', 'flex-col', 'py-6', 'px-10', 'grow');
    bdHeader.classList.add('flex', 'flex-row', 'justify-start', 'items-center', 'pb-6');
    bdIcon.classList.add('fa-regular', 'fa-game-console-handheld', 'text-4xl', 'pr-5');
    bdTitle.classList.add('bd-title', 'font-brand-title', 'text-5xl');
    saves.classList.add('saves', 'flex', 'flex-wrap', 'p-5', 'grow', 'rounded-xl');
    
    boozeDexWindow.style.display = 'none';
    boozeDexWindow.style.transform = 'scale(0)';
    document.body.appendChild(boozeDexWindow);

    const openBoozeDex = () => {
        btnDex.removeEventListener('click', openBoozeDex);
        btnDex.addEventListener('click', closeBoozeDex);
        btnCloseDex.addEventListener('click', closeBoozeDex);
        boozeDexWindow.style.display = 'flex';
        setTimeout(() => boozeDexWindow.style.transform = 'scale(1)')
    };

    const closeBoozeDex = () => {
        btnDex.addEventListener('click', openBoozeDex);
        btnDex.removeEventListener('click', closeBoozeDex);
        boozeDexWindow.style.transform = 'scale(0)';
        setTimeout(() => boozeDexWindow.style.display = 'none', 200)
    };
    
    btnDex.addEventListener('click', openBoozeDex);
};

const readyFunc = () => {
    setTitle();
    window.addEventListener('resize', changeTitleSize);
    renderBoozeDex();
    getLocalSaves();
    renderSaves();
};

window.onload = readyFunc();