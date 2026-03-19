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
        console.log(parsedData);
        // next steps: dynamically populate the HTML with the parsed data
        // add event listeners for edit/delete requests
    }
    catch (error) {
        console.error('Error fetching palettes:', error.message);
    }
}

// old code
// function load() {
// // here a conditional about if there was an email input and if not load palettes with local storage


//     let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

//     if (loadExistingPalettes.length === 0) {
//         dropdown.style.display = 'none';
//         libraryWrapper.innerHTML = `<div class="alert alert-warning" role="alert">
//                                     Your color library is empty. Click 'Create New Palette' to make a color palette.</div>`
//     }
//     else {
//         loadExistingPalettes.reverse();        
//         loadExistingPalettes.forEach(palette => {
//             // Dropdown menu
//             let newDropdownItem = document.createElement('a');
//             newDropdownItem.classList.add('dropdown-item');
//             newDropdownItem.href = `#${palette.title}`;
//             newDropdownItem.textContent = `${palette.title}`;
//             dropdownMenu.appendChild(newDropdownItem);

//             let paletteInfo = document.createElement('div');
//             paletteInfo.classList.add('palette-wrapper');
//             paletteInfo.innerHTML = `
//             <h2 class="palette-title" id="${palette.title}">${palette.title}</h2>
//         <div class="box-wrapper">
//         <div class="box" data-color="color1" style="background-color: ${palette.colors[0]};">
//         <span class="color-code">${palette.colors[0]}</span>
//             <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
//             <input type="color" data-picker="colorPicker1" style="display: none;">
//             <div class="overlay"></div>
//             </div>
//         <div class="box" data-color="color2" style="background-color: ${palette.colors[1]};">
//             <span class="color-code">${palette.colors[1]}</span>
//             <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
//             <div class="overlay"></div>
//             </div>
//             <input type="color" data-picker="colorPicker2" style="display: none;">        
//         <div class="box" data-color="color3" style="background-color: ${palette.colors[2]};">
//             <span class="color-code">${palette.colors[2]}</span>
//             <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
//             <div class="overlay"></div>            
//             </div>
//             <input type="color" data-picker="colorPicker3" style="display: none;">
//         <div class="box" data-color="color4" style="background-color: ${palette.colors[3]};">
//             <span class="color-code">${palette.colors[3]}</span>
//             <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
//             <div class="overlay"></div>
//             </div>
//             <input type="color" data-picker="colorPicker4" style="display: none;">
//         </div>
//         <div class="btn-wrapper">
//             <button class="contrast-btn btn btn-light" data-id="${palette.id}">Check Palette Accessability</button>
//             <button class="delete-btn btn btn-light">Delete</button>
//         </div>`

//             libraryWrapper.appendChild(paletteInfo);

//                     // dynamically edit color palettes
//             for (let i = 1; i <= 4; i++) {
//                 let color = paletteInfo.querySelector(`[data-color="color${i}"]`);
//                 let picker = paletteInfo.querySelector(`[data-picker="colorPicker${i}"]`);
//                 let initialColor = color.textContent;
//                 let paletteTitle = paletteInfo.querySelector('.palette-title').textContent;
            
//                 if (color && picker) {
//                     color.addEventListener('click', () => {
//                         picker.click();
//                     })
            
//                     picker.addEventListener('input', (event) => {
//                         const colorValue = event.target.value;
//                         let colorCode = document.querySelector('.color-code');
//                         color.style.backgroundColor = colorValue;
//                         colorCode = colorValue;
//                         if (initialColor !== colorValue) {
//                             editLocalStorage(paletteTitle, colorValue, initialColor);
//                         }
//                     })
//                 }
//             }
            

//             // Check accessability button
//             const contrastBtn = paletteInfo.querySelector('.contrast-btn');
//             contrastBtn.addEventListener('click', (e) => {
//                 const id = e.target.getAttribute('data-id');
//                 window.location.href= `../contrast.html?id=${id}`;
//             })

//             // Delete button
//             const deleteBtn = paletteInfo.querySelector('.delete-btn');
//             const paletteTitle = paletteInfo.firstChild.nextSibling.textContent;
//             deleteBtn.addEventListener('click', () => {
//                 if (confirm('Are you sure you want to delete this palette?'))
//                 deletePalette(paletteTitle);
//             });
//         });
//     }

//     //Dropdown event listener 
//     dropdownMenuButton.addEventListener('click', () => {
//         dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
//     })

//     window.addEventListener('click', (e) => {
//         if (!e.target.matches('#dropdownMenuButton')) {
//             dropdownMenu.style.display = 'none';
//         }
//     })
// }

// function editLocalStorage(paletteTitle, colorValue, initialColor) {
//     let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];
//     let palette = loadExistingPalettes.find((palette) => palette.title === paletteTitle);
//     let index = palette.colors.findIndex((color) => color === initialColor);
//     palette.colors.splice(index, 1, colorValue);

//     localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
// }

// function deletePalette(paletteTitle) {
//     let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];
//     let palette = loadExistingPalettes.find((palette) => palette.title === paletteTitle);
//     let paletteIndex = loadExistingPalettes.findIndex((paletteToRemove) => paletteToRemove === palette);

//     loadExistingPalettes.splice(paletteIndex, 1);

//     localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));

//     window.location.href= '../library.html';
// }


// export { load };