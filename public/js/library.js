import { libraryWrapper, singlePalette } from "./index.js";


function load() {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    if (loadExistingPalettes.length === 0) {
        window.alert('No existing palettes');
    }
    else {        
        loadExistingPalettes.forEach(palette => {
            let paletteInfo = document.createElement('div');
            paletteInfo.classList.add('palette-wrapper');
            paletteInfo.innerHTML = `
            <h2 class="palette-title">${palette.title}</h2>
        <div class="box" data-color="color1" style="background-color: ${palette.colors[0]};">${palette.colors[0]}</div>
            <input type="color" data-picker="colorPicker1" style="display: none;">
        <div class="box" data-color="color2" style="background-color: ${palette.colors[1]};">${palette.colors[1]}</div>
            <input type="color" data-picker="colorPicker2" style="display: none;">        
        <div class="box" data-color="color3" style="background-color: ${palette.colors[2]};">${palette.colors[2]}</div>
            <input type="color" data-picker="colorPicker3" style="display: none;">
        <div class="box" data-color="color4" style="background-color: ${palette.colors[3]};">${palette.colors[3]}</div>
            <input type="color" data-picker="colorPicker4" style="display: none;">
        <div class="btn-wrapper">
            <button class="delete-btn">Delete</button>
        </div>`


            libraryWrapper.appendChild(paletteInfo);

                    // dynamically edit color palettes
            for (let i = 1; i <= 4; i++) {
                let color = paletteInfo.querySelector(`[data-color="color${i}"]`);
                let picker = paletteInfo.querySelector(`[data-picker="colorPicker${i}"]`);
                let initialColor = color.textContent;
                let paletteTitle = paletteInfo.querySelector('.palette-title').textContent;
            
                if (color && picker) {
                    color.addEventListener('click', () => {
                        picker.click();
                    })
            
                    picker.addEventListener('input', (event) => {
                        const colorValue = event.target.value;
                        color.style.backgroundColor = colorValue;
                        color.textContent = colorValue;
                        singlePalette.colors[i - 1] = colorValue;
                        if (initialColor !== colorValue) {
                            editLocalStorage(paletteTitle, colorValue, initialColor);
                        }
                    })
                }
            }

            const deleteBtn = paletteInfo.querySelector('.delete-btn');
            const paletteTitle = paletteInfo.firstChild.nextSibling.textContent;
            deleteBtn.addEventListener('click', () => {
                deletePalette(paletteTitle);
            });
        });
    }
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