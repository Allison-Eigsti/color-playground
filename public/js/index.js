import { load } from './library.js';
import { navMenuToggle } from './navToggle.js';

const saveBtn = document.getElementById('saveToLocalStorage');

// Holds new palette's data before saving 
const singlePalette = {
    id: Date.now(),
    title: '',
    colors: ['', '', '', '']
}

const libraryWrapper = document.getElementById('library-wrapper');


document.addEventListener('DOMContentLoaded', () => {
    // AI Citation: used ChatGPT to figure out format for importing functions from another .js file
    // Import function that collapses nav bar at smaller screen sizes, click hamburger icon for dropdown menu
    navMenuToggle({
        navToggle: document.querySelector('.mobile-nav-toggle'),
        primaryNav: document.querySelector('.primary-navigation'),
        openIcon: document.querySelector('.hamburger-icon'),
        closeIcon: document.querySelector('.close-icon'),
    })

    // Loop through color palette boxes
    for (let i = 1; i <= 4; i++) {
        const color = document.getElementById(`color${i}`);
        const picker = document.getElementById(`colorPicker${i}`);

        // Event listeners added to each box to pop up color picker input upon click 
        if (color && picker) {
            color.addEventListener('click', () => {
                picker.click();
            })

            // Selected color becomes box background and is added to singlePalette.colors which stores current color selections, title, and id of new palette
            picker.addEventListener('input', (event) => {
                const colorValue = event.target.value;
                color.style.backgroundColor = colorValue;
                singlePalette.colors[i - 1] = colorValue;
            })
        }
    }

    // If on index page and user has selected 4 colors, save button saves new palette to local storage 
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (singlePalette.colors.includes('')) {
                return window.alert('You must select 4 colors to save a color palette.');
            }
            saveToLocalStorage();
        });
    }

    // If on library page, load all previously saved palettes from local storage and display them 
    if (libraryWrapper) {
        load(); 
    }
})

// Function to save new palette to local storage
function saveToLocalStorage() {
    const title = document.getElementById('palette-title').value || 'Untitled Palette';
    singlePalette.title = `${title}`;
    
    // Create copy of singlePalette called newPalette
    let newPalette = {...singlePalette, colors: [...singlePalette.colors]};

    // Retrieve (and parse into JavaScript objects) previously saved palettes from local storage (if any) 
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    // Add new palette to array of existing palettes
    loadExistingPalettes.push(newPalette);

    // Stringify new array of palettes and save to local storage 
    localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
    
    // Load library.html page which displays all saved palettes 
    window.location.href= '../library.html';
};


export { libraryWrapper, singlePalette };