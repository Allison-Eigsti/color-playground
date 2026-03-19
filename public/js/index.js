import { load } from './library.js';

const user = localStorage.getItem('UUID');

const singlePalette = {
    user: user,
    id: Date.now(),
    title: '',
    colors: ['', '', '', '']
}

const libraryWrapper = document.getElementById('library-wrapper');

const form = document.querySelector('form');


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
        }
    }

    if (libraryWrapper) {
        load(); 
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!user) {
                console.error('No user found.')
                return;
            }
            
            const data = new FormData(form);

            const newPalette = {
                user: user,
                title: data.get('title'),
                colors: [
                    data.get('color1'),
                    data.get('color2'),
                    data.get('color3'),
                    data.get('color4'),
                ]
            }

            try {
                const response = await fetch('http://localhost:8000/api/palettes', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(newPalette)
                });

                if (response.ok) {
                    window.location.href = './library.html';
                }
            }
            catch (error) {
                console.error(error.message)
            }
        })
    }
})


// function saveToLocalStorage() {
//     const title = document.getElementById('palette-title').value || 'Untitled Palette';
//     singlePalette.title = `${title}`;
    
//     let newPalette = {...singlePalette, colors: [...singlePalette.colors]};

//     let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

//     loadExistingPalettes.push(newPalette);

//     localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
    
//     window.location.href= '../library.html';
// };


// Creates new user UUID
function generateUUID() {
    let newUUID = crypto.randomUUID();
    localStorage.setItem('UUID', newUUID);
}


export { libraryWrapper, singlePalette, user };