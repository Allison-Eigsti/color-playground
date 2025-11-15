const paletteWrapper = document.getElementById('palette-wrapper');
let selectedColors = []

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
        
        paletteInfo.classList.add('palette-wrapper');
        paletteInfo.innerHTML = `<h3 class="palette-title">${palette.title}</h3>
        <div class="box-wrapper">
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
            </div>
            </div>
                 
            <div class="btn-wrapper">
                <button class="contrast-btn btn btn-light">Check Color Contrast</button>
            </div>`

        paletteWrapper.appendChild(paletteInfo);

        for (let i = 1; i <=4; i++) {
            let color = paletteInfo.querySelector(`[data-color="color${i}"]`);
            color.addEventListener('click', () => {
                let colorCode = palette.colors[i - 1];

                if (colorCode !== selectedColors[0] && colorCode !== selectedColors[1]) {
                    if (selectedColors.length < 2) {
                        selectedColors.push(colorCode);
                        color.classList.add('selected'); 
                    } else {
                        let removed = selectedColors.shift()
                        let removedColor = paletteInfo.querySelector(`[data-color][style*="${removed}`);

                        if (removedColor) {
                            removedColor.classList.remove('selected');
                        };

                        selectedColors.push(colorCode);
                        color.classList.add('selected'); 
                    }
                } else {
                    window.alert('The same color cannot be selected twice.')
                }
            })
        } 

        const contrastBtn = document.querySelector('.contrast-btn');
        contrastBtn.addEventListener('click', () => checkContrast());
    };
}


async function checkContrast() {
    if (selectedColors.length < 2) {
        window.alert('2 colors must be selected to use the contrast tool.')
    }
    else {
        try {
            let color1 = selectedColors[0].substring(1);
            let color2 = selectedColors[1].substring(1);

            let response = await fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${color1}&bcolor=${color2}&api`)
            let data = await response.json();

            const resultWrapper = document.getElementById('result');
            resultWrapper.innerHTML = `<h3>Results:</h3>
            <p>Contrast ratio: ${data.ratio}</p>
            <p>The selected colors ${data.AA}ed the accessability check.</p>`;
            resultWrapper.classList.add('active');
            
            if (data.AA === 'pass') {
                resultWrapper.classList.add('alert');
                resultWrapper.classList.add('alert-success');
            } else {
                resultWrapper.classList.add('alert');
                resultWrapper.classList.add('alert-danger');            
            }
        }
        catch (error) {
            console.error('error')
        }
    }
}