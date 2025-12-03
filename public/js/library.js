import { libraryWrapper, singlePalette } from "./index.js";

const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownMenuButton = document.querySelector('#dropdownMenuButton');


function load() {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    if (loadExistingPalettes.length === 0) {
        dropdown.style.display = 'none';
        libraryWrapper.innerHTML = `<div class="alert alert-warning" role="alert">
                                    Your color library is empty. Click 'Create New Palette' to make a color palette.</div>`
    }
    else {
        loadExistingPalettes.reverse();        
        loadExistingPalettes.forEach(palette => {
            // Dropdown menu
            let newDropdownItem = document.createElement('a');
            newDropdownItem.classList.add('dropdown-item');
            newDropdownItem.href = `#${palette.title}`;
            newDropdownItem.textContent = `${palette.title}`;
            dropdownMenu.appendChild(newDropdownItem);

            let paletteInfo = document.createElement('div');
            paletteInfo.classList.add('palette-wrapper');
            paletteInfo.innerHTML = `
            <h2 class="palette-title" id="${palette.title}">${palette.title}</h2>
        <div class="box-wrapper">
        <div class="box" data-color="color1" style="background-color: ${palette.colors[0]};">
        <span data-code="code1">${palette.colors[0]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <input type="color" data-picker="colorPicker1" style="display: none;">
            <div class="overlay"></div>
            </div>
        <div class="box" data-color="color2" style="background-color: ${palette.colors[1]};">
            <span data-code="code2">${palette.colors[1]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
            <input type="color" data-picker="colorPicker2" style="display: none;">        
        <div class="box" data-color="color3" style="background-color: ${palette.colors[2]};">
            <span data-code="code3">${palette.colors[2]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>            
            </div>
            <input type="color" data-picker="colorPicker3" style="display: none;">
        <div class="box" data-color="color4" style="background-color: ${palette.colors[3]};">
            <span data-code="code4">${palette.colors[3]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
            <input type="color" data-picker="colorPicker4" style="display: none;">
        </div>
        <div class="btn-wrapper">
            <button class="contrast-btn btn btn-outline-dark" data-id="${palette.id}">Check Palette Accessability</button>
            <button class="delete-btn btn btn-outline-dark">Delete</button>
        </div>`

            libraryWrapper.appendChild(paletteInfo);

                    // dynamically edit color palettes
            for (let i = 1; i <= 4; i++) {
                let color = paletteInfo.querySelector(`[data-color="color${i}"]`);
                let picker = paletteInfo.querySelector(`[data-picker="colorPicker${i}"]`);
                let initialColor = color.textContent;
                let colorCode = document.querySelector(`[data-code="code${i}"]`);
                let paletteTitle = paletteInfo.querySelector('.palette-title').textContent;

            
                if (color && picker) {
                    color.addEventListener('click', () => {
                        picker.click();
                    })
            
                    picker.addEventListener('input', (event) => {
                        const colorValue = event.target.value;
                        color.style.backgroundColor = colorValue;
                        colorCode.textContent = colorValue;
                        singlePalette.colors[i - 1] = colorValue;
                        if (initialColor !== colorValue) {
                            editLocalStorage(paletteTitle, colorValue, initialColor);
                        }
                    })
                }
            }
            

            // Check accessability button
            const contrastBtn = paletteInfo.querySelector('.contrast-btn');
            contrastBtn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                window.location.href= `../contrast.html?id=${id}`;
            })

            // Delete button
            const deleteBtn = paletteInfo.querySelector('.delete-btn');
            const paletteTitle = paletteInfo.firstChild.nextSibling.textContent;
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this palette?'))
                deletePalette(paletteTitle);
            });
        });
    }

    //Dropdown event listener 
    dropdownMenuButton.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    })

    window.addEventListener('click', (e) => {
        if (!e.target.matches('#dropdownMenuButton')) {
            dropdownMenu.style.display = 'none';
        }
    })
}

function editLocalStorage(paletteTitle, colorValue, initialColor) {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];
    let palette = loadExistingPalettes.find((palette) => palette.title === paletteTitle);
    let index = palette.colors.findIndex((color) => color === initialColor);
    palette.colors.splice(index, 1, colorValue);

    localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
}

function deletePalette(paletteTitle) {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];
    let palette = loadExistingPalettes.find((palette) => palette.title === paletteTitle);
    let paletteIndex = loadExistingPalettes.findIndex((paletteToRemove) => paletteToRemove === palette);

    loadExistingPalettes.splice(paletteIndex, 1);

    localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));

    window.location.href= '../library.html';
}


export { load };