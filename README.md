# color-playground
-

## Overview:

A fully-responsive digital tool for artists and designers that includes a space for color experimentation and a personal library of stored color schemes.

Other features include:
    - A tool for creating custom color palettes
    - The ability to edit/delete color palettes from the user's color library
    - An accessability checker tool that determines the degree of contrast between 2 selected colors (incorporating [WebAIM's Color Contrast API](https://webaim.org/resources/contrastchecker/))


Tools and Technologies used: Node.js, Express.js, HTML5, CSS3 (Grid, Flexbox, Media Queries), Bootstrap, JavaScript, [WebAIM's Color Contrast API](https://webaim.org/resources/contrastchecker/).

## About the Color Playground Exercises
This application was inspired by Josef Alber's theory of color, which is based around the understanding of colors as relative. Alber's designed a series of exercises that challenge the learner to observe how colors change based on the colors around them. These exercises can be found in his revolutionary work: [The Interaction of Color](https://books.google.es/books?id=A_MYU_XDXfcC&printsec=frontcover&source=gbs_atb&redir_esc=y#v=onepage&q&f=false). In response to a lack of free digital tools to experiment with these exercises, I designed an application which allows the user to engage in two of the fundamental challenges: making one color look like two, and making two colors look like one. These can be found in the Color Playground section of my website.

## Prerequisites
Before getting started, make sure you have the following installed on your system:
  - **Node.js** 
    - Developed with **Node.js v22.14.0**
  - **Git**
  - A code editor (**Visual Studio Code** recommended)

You can verify your Node.js and npm installation by running:

```bash
node --version
npm --version


## Getting Started
1. Clone the repository using GIT

    `git clone https://github.com/Allison-Eigsti/color-playground.git`

2. Navigate into the project folder

    `cd color-playground`

3. Install dependencies
    `npm install`

4. Run development server
    `npm run dev`

5. In your browser, navigate to:
    `http://localhost:8000`


## File Organization
—
The Color Playground has the following file structure:
The root directory: color-playground

```python
color-playground
├─ node_modules
├─ public
│  ├─ assets
│  │  └─ icons
│  │     └─ edit-icon.png
│  │  └─ images
│  │     ├─ 3-mallas.png
│  │     └─ main-graphic.png
│  ├─ css
│  │  ├─ reset.css
│  │  └─ style.css
│  ├─ js
│  │  ├─ contrast.js
│  │  ├─ index.js
│  │  ├─ library.js
│  │  └─ playground.js
│  ├─ contrast.html
│  ├─ index.html
│  ├─ library.html
│  ├─ playground.html
│  └─ playground2.html
├─ package.json
├─ README.md
└─ server.js
```

## Capstone Requirements
1. Analyze Data Stored in Arrays: 
   - All of the user's color palettes are stored in an array of objects. Each object contains an id, a title, and an additional array of colors (hex codes).
   - I used array methods such as .forEach(), .findIndex(), and .splice(), to display, edit, and delete the color palettes from the user's color library.

2. Persist Data to Local Storage:
   - After a user selects four colors to save in a color palette, the hex codes are saved in a palette object in local storage. The palettes are then displayed on the color library page for future use.

3. Create a Node.js Web Server using Express.js
   - This application uses a Node.js web server to serve the static HTML files found in the public folder.

### Code Examples
1. Save Palette to Local Storage:
   `function saveToLocalStorage() {
    const title = document.getElementById('palette-title').value || 'Untitled Palette';
    singlePalette.title = `${title}`;
    
    let newPalette = {...singlePalette, colors: [...singlePalette.colors]};

    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    loadExistingPalettes.push(newPalette);

    localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
    
    window.location.href= '../library.html';
    };`

In this example, the title that the user inputs is saved to an object called 'singlePalette', which already includes 4 colors the user has chosen. The object singlePalette is copied and saved as a variable, newPalette. I then retrieve the previously saved palettes from local storage in a variable called loadExistingPalettes. The newPalette object is then pushed to the array of previously saved palettes, allowing the new palette to be displayed in the color library.

2. GET Request to WebAIM API:
    `if (selectedColors.length < 2) {
        window.alert('2 colors must be selected to use the contrast tool.')
    }
    else {
        try {
            let color1 = selectedColors[0].substring(1);
            let color2 = selectedColors[1].substring(1);

            let response = await fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${color1}&bcolor=${color2}&api`)
            let data = await response.json();

            selectedColors = [];

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
            console.error(error);
        }
    }`

In this code snippet, an asynchronous GET request is made to the WebAIM Contrast Checker API. I use a try... catch block to catch potential runtime errors. Two colors in hex decimals (saved in an array called selectedColors) are sent as query parameters in the API request URL. The request is sent as fetch() and the code awaits an HTTP response. Response.json() is then used to parse the response body into a JavaScript object. The array selectedColors is reset so that the user can repeat the process. 

Next, I use the returned data to dynamically update the DOM, using a conditional to display a success alert (Bootstrap) if the colors pass the contrast check and a danger alert if they fail the check. If an error occurs during this process, it is caught and logged to the console.

### Future Plans
In the future, I aim to build out my own API to store user's color palettes in a JSON file. I plan to use cookies and UUIDs to identify different users in order to associate certain color palettes with a specific user. I will need a GET route to display color the color palettes in the user's library, a POST route for creating new palettes, as well as PUT and DELETE routes to edit and delete palettes.

Eventually, I would also like revamp the user interface with React.

### Citations
- AI Usage:
  1. AI was used in the contrast.js to figure out how to target the correct color box in order to remove the ".selected" class. 
    
    let removed = selectedColors.shift()
    let removedColor = paletteInfo.querySelector(`[data-color][style*="${removed}"]`);

    if (removedColor) {
        removedColor.classList.remove('selected');
    };

- Other Citations: 
  1. Traversy Media [Node.js Crash Course](https://www.youtube.com/watch?v=32M1al-Y6Ag)
  2. Traversy Media [Express Crash Course](https://www.youtube.com/watch?v=CnH3kAXSrmU)
  3. New Trix [Save & Load All Variables To Local Storage | EASY | JavaScript | HTML](https://www.youtube.com/watch?v=ePHfRUIvbbg)
  4. Tony Teaches Tech: [How to Link to a Specific Part of a Page (HTML anchor link)](https://www.youtube.com/watch?v=xHFzQ8QRjGU)
  5. Random Color Generator: [Stack Overflow](https://stackoverflow.com/questions/1484506/random-color-generator)

### Credits
- Many thanks to Dan Collins for his helpful feedback throughout the stages of this project.

### Author 
Allison Eigsti, December 2025
