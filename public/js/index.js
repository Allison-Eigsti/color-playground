import { load } from './library.js';

const user = localStorage.getItem('UUID');

const saveBtn = document.getElementById('saveToLocalStorage');

const singlePalette = {
    user: user,
    id: Date.now(),
    title: '',
    colors: ['', '', '', '']
}

const libraryWrapper = document.getElementById('library-wrapper');


document.addEventListener('DOMContentLoaded', () => {
    // Checks if browser is associated with a user
    if (user === null) {
        generateUUID();
    }

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

            saveBtn.addEventListener('click', saveToLocalStorage);
        }
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


// Creates new user UUID
function generateUUID() {
    let newUUID = crypto.randomUUID();
    localStorage.setItem('UUID', newUUID);
}


export { libraryWrapper, singlePalette, user };