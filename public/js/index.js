const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const smallBoxes = document.querySelectorAll('.small');

const colorPicker1 = document.getElementById('colorPicker1');
const colorPicker2 = document.getElementById('colorPicker2');


document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        const sameColor = generateColor();
        smallBoxes.forEach((box) => {
            box.style.backgroundColor = sameColor;
        })
    })

    box1.addEventListener('click', () => {
        colorPicker1.click();
    })
    
    colorPicker1.addEventListener('input', (event) => {
        box1.style.backgroundColor = event.target.value;
        const color1 = event.target.value
        console.log(`Color 1: ${color1}`);
    })
    
    
    box2.addEventListener('click', () => {
        colorPicker2.click();
    })
    
    colorPicker2.addEventListener('input', (event) => {
        box2.style.backgroundColor = event.target.value;
        const color2 = event.target.value
        console.log(`Color 2: ${color2}`);    
    })
})

// cite source: https://stackoverflow.com/questions/1484506/random-color-generator
function generateColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
}