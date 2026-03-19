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


// HF: get all
async function getAllPalettes() {
    const palettesData = await fs.readFile(palettesFilePath, 'utf-8');

    // if there is no data in allPalettes.json, return an empty array
    if (!palettesData.trim()) return [];
    return JSON.parse(palettesData)
}

// Route: GET all palettes
router.get('/', async (req, res, next) => {
    try {
        const palettes = await getAllPalettes();
        res.status(200).json(palettes);
    } catch (error) {
        next(error);
    }
});

// Route: GET specific palette by id
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


// HF: Create new palette

function createPalette(requestBody) {
    const { user, title, colors } = requestBody;

    if (!title || !user || !Array.isArray(colors) || colors.length !== 4) {
        return undefined
    }

    // add check if palette has exactly 4 colors... (maybe on frontend?)

    return {
        user,
        id : Date.now(),
        title,
        colors
    }
}

// POST route: create new palette
// figure out how to link form data on front end to here...)
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



// PUT route to edit palette
// DELETE route to delete palettes

export default router;