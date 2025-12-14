import { load } from './library.js';
import { navMenuToggle } from './navToggle.js';

const saveBtn = document.getElementById('saveToLocalStorage');

const singlePalette = {
    id: Date.now(),
    title: '',
    colors: ['', '', '', '']
}

const libraryWrapper = document.getElementById('library-wrapper');


document.addEventListener('DOMContentLoaded', () => {
    /* AI Citation: used ChatGPT to figure out format for importing functions from another .js file */
    navMenuToggle({
        navToggle: document.querySelector('.mobile-nav-toggle'),
        primaryNav: document.querySelector('.primary-navigation'),
        openIcon: document.querySelector('.hamburger-icon'),
        closeIcon: document.querySelector('.close-icon'),
    })


    for (let i = 1; i <= 4; i++) {
        const color = document.getElementById(`color${i}`);
        const picker = document.getElementById(`colorPicker${i}`);

        if (color && picker) {
            color.addEventListener('click', () => {
                picker.click();
            })

            picker.addEventListener('input', (event) => {
                const colorValue = event.target.value;
                color.style.backgroundColor = colorValue;
                singlePalette.colors[i - 1] = colorValue;
            })
        }
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (singlePalette.colors.includes('')) {
                return window.alert('You must select 4 colors to save a color palette.');
            }
            saveToLocalStorage();
        });
    }

    if (libraryWrapper) {
        load(); 
    }
})


function saveToLocalStorage() {
    const title = document.getElementById('palette-title').value || 'Untitled Palette';
    singlePalette.title = `${title}`;
    
    let newPalette = {...singlePalette, colors: [...singlePalette.colors]};

    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    loadExistingPalettes.push(newPalette);

    localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
    
    window.location.href= '../library.html';
};


export { libraryWrapper, singlePalette };