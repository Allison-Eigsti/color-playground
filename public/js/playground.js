import { navMenuToggle } from './navToggle.js';

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');

const colorPicker1 = document.getElementById('colorPicker1');
const colorPicker2 = document.getElementById('colorPicker2');

/* Exercise 1 */
const smallBoxes = document.querySelectorAll('.small');

/* Exercise 2 */
const smallBox1 = document.getElementById('small1');
const smallBox2 = document.getElementById('small2');

const colors = [
    ['#5A8F9B', '#439DA3'], 
    ['#F0B36C', '#E39F4F'], 
    ['#2C8ED4', '#2C67D4'],
    ['#8A2BE2', '#AC26E0'],
    ['#FFD700', '#E8C402'],
    ['#607865', '#4D6953'],
    ['#B668BD', '#A84AB0'],
    ['#871B61', '#AD1778'],
    ['#A2F774', '#80D94E'],
    ['#A39C77', '#857D58'],
    ['#8DCCF2', '#8DE6F2'],
]


document.addEventListener('DOMContentLoaded', () => {
    navMenuToggle({
        navToggle: document.querySelector('.mobile-nav-toggle'),
        primaryNav: document.querySelector('.primary-navigation'),
        openIcon: document.querySelector('.hamburger-icon'),
        closeIcon: document.querySelector('.close-icon'),
    })

    window.addEventListener('load', () => {
        // Checks to make sure user is on Exercise 1 page
        if (!smallBox1 && !smallBox2) {
            // Randomly generates color for small boxes in center of larger boxes
            const sameColor = generateColor();
            smallBoxes.forEach((box) => {
                box.style.backgroundColor = sameColor;
            })
        }
        else {
            // If on Exercise 2 page, randomly selects colors from previously established array: colors and applies those colors to the small inner boxes
            let i = Math.floor(Math.random() * colors.length);
            smallBox1.style.backgroundColor = colors[i][0];
            smallBox2.style.backgroundColor = colors[i][1];
        }
    })

    // Adds event listeners so user can change background color of larger boxes (on both exercise pages)
    box1.addEventListener('click', () => {
        colorPicker1.click();
    })
    
    colorPicker1.addEventListener('input', (event) => {
        const color1 = event.target.value
        box1.style.backgroundColor = color1;
    })
    
    
    box2.addEventListener('click', () => {
        colorPicker2.click();
    })
    
    colorPicker2.addEventListener('input', (event) => {
        const color2 = event.target.value
        box2.style.backgroundColor = color2;   
    })
})

// Source: https://stackoverflow.com/questions/1484506/random-color-generator
// Randomly generates a hex decimal color
function generateColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
}