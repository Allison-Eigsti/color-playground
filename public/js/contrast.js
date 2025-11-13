const paletteWrapper = document.getElementById('palette-wrapper');

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    loadContrastPalette(id);
})

function loadContrastPalette(id) {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];
    let palette = loadExistingPalettes.find(palette => palette.id === id);
    
    if (!palette) {
        paletteWrapper.innerHTML = `This palette was not found.`
    }
    else {
        let paletteInfo = document.createElement('div');
        let selectedColors = [];

        
        paletteInfo.classList.add('palette-wrapper');
        paletteInfo.innerHTML = `<h3 class="palette-title">${palette.title}</h3>
        <div class="box" data-color="color1" style="background-color: ${palette.colors[0]};">
        <span class="color-code">${palette.colors[0]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
        <div class="box" data-color="color2" style="background-color: ${palette.colors[1]};">
            <span class="color-code">${palette.colors[1]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>
        <div class="box" data-color="color3" style="background-color: ${palette.colors[2]};">
            <span class="color-code">${palette.colors[2]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>            
            </div>
        <div class="box" data-color="color4" style="background-color: ${palette.colors[3]};">
            <span class="color-code">${palette.colors[3]}</span>
            <img src="/assets/icons/edit-icon.png" alt="Edit" class="hover-edit">
            <div class="overlay"></div>
            </div>`

        paletteWrapper.appendChild(paletteInfo);

        for (let i = 1; i <=4; i++) {
            let color = paletteInfo.querySelector(`[data-color="color${i}"]`);
            color.addEventListener('click', () => {
                let colorCode = palette.colors[i - 1];

                if (colorCode !== selectedColors[0] && colorCode !== selectedColors[1]) {
                    if (selectedColors.length < 2) {
                        selectedColors.push(colorCode);  
                    } else {
                        selectedColors.shift();
                        selectedColors.push(colorCode);
                    }
                } else {
                    window.alert('The same color cannot be selected twice.')
                }
            })
        } 
};
}