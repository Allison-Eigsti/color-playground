import { libraryWrapper, singlePalette } from "./index.js";

const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownMenuButton = document.querySelector('#dropdownMenuButton');


function load() {
    console.log(singlePalette);
    console.log(singlePalette.colors);
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    console.log(loadExistingPalettes);
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

            // Dynamically generate color palettes that have been saved to local storage
            let paletteInfo = document.createElement('div');
            paletteInfo.classList.add('palette-wrapper');
            paletteInfo.innerHTML = `
            <h2 class="palette-title" id="${palette.title}">${palette.title}</h2>
        <div class="box-wrapper">
        <div class="box" data-color="color1" style="background-color: ${palette.colors[0]};">
        <div data-code="code1" class="color-code">${palette.colors[0]}</div>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <input type="color" data-picker="colorPicker1" style="display: none;">
            <div class="overlay"></div>
            </div>
        <div class="box" data-color="color2" style="background-color: ${palette.colors[1]};">
            <div data-code="code2" class="color-code">${palette.colors[1]}</div>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
            <input type="color" data-picker="colorPicker2" style="display: none;">        
        <div class="box" data-color="color3" style="background-color: ${palette.colors[2]};">
            <div data-code="code3" class="color-code">${palette.colors[2]}</div>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>            
            </div>
            <input type="color" data-picker="colorPicker3" style="display: none;">
        <div class="box" data-color="color4" style="background-color: ${palette.colors[3]};">
            <div data-code="code4" class="color-code">${palette.colors[3]}</div>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
            <input type="color" data-picker="colorPicker4" style="display: none;">
        </div>
        <div class="btn-wrapper">
            <button class="contrast-btn btn btn-custom" data-id="${palette.id}">Check Palette Accessability</button>
            <button class="delete-btn btn">Delete</button>
        </div>`

            libraryWrapper.appendChild(paletteInfo);

            // dynamically edit color palettes
            for (let i = 1; i <= 4; i++) {
                let color = paletteInfo.querySelector(`[data-color="color${i}"]`);
                let picker = paletteInfo.querySelector(`[data-picker="colorPicker${i}"]`);
                let colorCode = paletteInfo.querySelector(`[data-code="code${i}"]`);
                let paletteTitle = paletteInfo.querySelector('.palette-title').textContent;

            
                if (color && picker) {
                    color.addEventListener('click', () => {
                        picker.click();
                    })
            
                    picker.addEventListener('input', (event) => {
                        const colorValue = event.target.value;
                        color.style.backgroundColor = colorValue;
                        colorCode.textContent = colorValue;

                        //AI citation: used ChatGPT to fix editing bug (colorIndex (i - 1) passed as a parameter instead of initalColor)
                        editLocalStorage(paletteTitle, i - 1, colorValue);
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
            const paletteTitle = paletteInfo.querySelector('.palette-title').textContent;
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

function editLocalStorage(paletteTitle, colorIndex, colorValue) {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];
    let palette = loadExistingPalettes.find((palette) => palette.title === paletteTitle);

    if (!palette) return;

    palette.colors[colorIndex] = colorValue;
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