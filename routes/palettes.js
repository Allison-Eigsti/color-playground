import express from 'express'
import { palettes } from '../data/allPalettes.js';

const router = express.Router();


// Routes - GET all palettes
router.get('/', (req, res) => {
    res.status(200).json(palettes);
});

// GET specific palette -- load contrast checker page
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const palette = palettes.find((palette) => palette.id === id);
    
    // maybe add limit here in query params...

    if (!palette) {
        const error = new Error(`A palette with the id of ${id} was not found.`);
        error.status = 404;
        return next(error);
    }
    
    res.status(200).json(palette);
});

// POST route: create new palette
// figure out how to link form data on front end to here...)
router.post('/', (req, res, next) => {
    const newPalette = {
        user: req.body.user,
        id: Date.now(),
        title: req.body.title,
        colors: [
            "#1414f1",
            "#380a0a",
            "#d26565",
            "#e1c019"
        ]
    };

    // add more error handlers.. for if the user doesn't include 4 colors and if UUID doesn't show up
    if (!newPalette.title) {
        const error = new Error('Please include a title.');
        error.status = 400;
        return next(error);
    }

    palettes.push(newPalette);
    res.status(201).json(palettes);
})


// PUT route to edit palette
// DELETE route to delete palettes

export default router;