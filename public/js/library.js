import { user } from "./index.js";

const libraryWrapper = document.getElementById('library-wrapper');

// const dropdown = document.querySelector('.dropdown');
// const dropdownMenu = document.querySelector('.dropdown-menu');
// const dropdownMenuButton = document.querySelector('#dropdownMenuButton');

window.addEventListener('DOMContentLoaded', () => {
    if (libraryWrapper) {
        loadExistingPalettes();
    }
})

async function loadExistingPalettes() {
    try {
        const res = await fetch('http://localhost:8000/api/palettes', {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`Error fetching palettes: status: ${res.status}`)
        }

        const parsedData = await res.json();
        const userPalettes = parsedData.filter((palette) => palette.user === user)

        // Check if user has created any palettes
        if (userPalettes.length === 0) {
            libraryWrapper.innerHTML = `<div class="alert alert-warning" role="alert">
                                 Your color library is empty. Click 'Create New Palette' to make a color palette.</div>`  
        }

        else {
        // Dynamically display all user palettes
        userPalettes.reverse();
        userPalettes.forEach(palette => {
            let paletteInfo = document.createElement('div');
            paletteInfo.classList.add('palette-wrapper');
            paletteInfo.innerHTML = `
            <h2 class="palette-title" id="${palette.title}">${palette.title}</h2>
        <div class="box-wrapper">
        <div class="box" data-color="color1" style="background-color: ${palette.colors[0]};">
        <span class="color-code">${palette.colors[0]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <input type="color" data-picker="colorPicker1" style="display: none;">
            <div class="overlay"></div>
            </div>
        <div class="box" data-color="color2" style="background-color: ${palette.colors[1]};">
            <span class="color-code">${palette.colors[1]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
            <input type="color" data-picker="colorPicker2" style="display: none;">        
        <div class="box" data-color="color3" style="background-color: ${palette.colors[2]};">
            <span class="color-code">${palette.colors[2]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>            
            </div>
            <input type="color" data-picker="colorPicker3" style="display: none;">
        <div class="box" data-color="color4" style="background-color: ${palette.colors[3]};">
            <span class="color-code">${palette.colors[3]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
            <input type="color" data-picker="colorPicker4" style="display: none;">
        </div>
        <div class="btn-wrapper">
            <button class="contrast-btn btn btn-light" data-id="${palette.id}">Check Palette Accessability</button>
            <button class="delete-btn btn btn-light">Delete</button>
        </div>`

            libraryWrapper.appendChild(paletteInfo);

        // dynamically edit color palettes
            for (let i = 1; i <= 4; i++) {
                let color = paletteInfo.querySelector(`[data-color="color${i}"]`);
                let picker = paletteInfo.querySelector(`[data-picker="colorPicker${i}"]`);
            
                if (color && picker) {
                    color.addEventListener('click', () => {
                        picker.click();
                    })
            
                    picker.addEventListener('input', (event) => {
                        const colorValue = event.target.value;
                        let initialColor = color.textContent;
                        let colorCode = color.querySelector('.color-code');
                        color.style.backgroundColor = colorValue;
                        colorCode.textContent = colorValue;
                        if (initialColor !== colorValue) {
                            // need to add await?
                            console.log(palette.colors);
                            console.log(color);

                            // index of color to change in 'colors' array
                            const index = i - 1;

                            updateColor(palette.id, index, colorValue);
                        }
                    })
                }
            }

        
        // Delete button
        const deleteBtn = paletteInfo.querySelector('.delete-btn');
        // define palette id here so i can pass it in

        deleteBtn.addEventListener('click', ()=> {
            console.log(palette.id);
            if (confirm('Are you sure you want to delete this palette?'))
            deletePalette(palette.id);
        })

        });
        }
    }
    catch (error) {
        console.error('Error fetching palettes:', error.message);
    }
}

async function deletePalette(id) {
    try {
        const res = await fetch(`http://localhost:8000/api/palettes/${id}`, {
            method: 'delete'
        })


        if (!res.ok) {
            throw new Error(`Error deleting palette with id of ${id}: status: ${res.status}`)  
        }

        window.location.href= '../library.html'
    }
    catch (error) {
        console.error('Error deleting palette', error.message);
    }
}


async function updateColor(id, index, newColor) {
    try {
        const res = await fetch(`http://localhost:8000/api/palettes/${id}/colors/${index}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ newColor })
        })

        if (!res.ok) {
            throw new Error(`Error updating palette with id of ${id}: status: ${res.status}`)
        }
    }
    catch (error) {
        console.error('Error editing color:', error.message);
    }
}

        // next steps: 
        // add back in dropdown menu functionality
        // Add contrast checker button and load contrast page with specific palette