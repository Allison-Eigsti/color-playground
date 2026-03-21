import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const router = express.Router();

// Import { palettes } from allPalettes.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const palettesFilePath = path.join(
    __dirname,
    "..",
    "data",
    "allPalettes.json"
);


// HELPER FUNCTIONS
// 1. Retrieve any existing palettes from json file
async function getAllPalettes() {
    const palettesData = await fs.readFile(palettesFilePath, 'utf-8');

    // if there is no data in allPalettes.json, return an empty array
    if (!palettesData.trim()) return [];
    return JSON.parse(palettesData)
}

// 2. Create new palette
function createPalette(requestBody) {
    const { user, title, colors } = requestBody;

    if (!title || !user || !Array.isArray(colors) || colors.length !== 4) {
        return undefined
    }

    //Add more data validation? (make sure colors are in correct format and check for repeat/valid titles etc...)

    return {
        user,
        id : Date.now(),
        title,
        colors
    }
}



// ROUTES
// GET all palettes
router.get('/', async (req, res, next) => {
    try {
        const palettes = await getAllPalettes();
        res.status(200).json(palettes);
    } catch (error) {
        next(error);
    }
});

// GET specific palette by id
router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const palettes = await getAllPalettes();
        const palette = palettes.find((palette) => palette.id === id)
        
        if (!palette) {
            const error = new Error(`A palette with the id of ${id} was not found`);
            error.status = 404;
            return next(error);
        }
        
        res.status(200).json(palette);
    }
    catch (error) {
        next(error);
    }
})

// POST route: create new palette
router.post('/', async (req, res, next) => {
    try {
        if (!req.body) {
            const error = new Error('Bad Request. Missing required information.')
            error.status = 400;
            return next(error);
        }

        const newPalette = createPalette(req.body);

        if (!newPalette) {
            const error = new Error('Bad Request. Missing required information.')
            error.status = 400;
            return next(error);
        }

        const palettes = await getAllPalettes();
        palettes.push(newPalette);
        await fs.writeFile(palettesFilePath, JSON.stringify(palettes, null, 2));

        res.status(201).json({
            data: newPalette
        });
    }
    catch (error) {
        next(error);
    }
});

// // PUT route to edit specific palette
router.put('/:id/colors/:index', async (req, res, next) => {
    const paletteId = parseInt(req.params.id);
    const index = parseInt(req.params.index);
    const { newColor } = req.body

    try {
        const palettes = await getAllPalettes();
        const palette = palettes.find((palette) => palette.id === paletteId);

        if (!palette) {
        const error = new Error(`Error. The palette with the if of ${paletteId} does not exist.`)
        error.status = 404;
        return next(error);
        }

        palette.colors[index] = newColor;

        await fs.writeFile(palettesFilePath, JSON.stringify(palettes, null, 2));

        res.status(200).json({ message: 'Color updated successfully', palette })
    }
    catch (error) {
        console.error(error.message)
        next(error);
    }
})

// DELETE route to delete a palette

export default router;