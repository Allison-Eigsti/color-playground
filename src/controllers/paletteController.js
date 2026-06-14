import pool from '../config/db.js';


export const getAllUsers = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        const usersArray = result.rows;

        if (usersArray.length === 0) {
            return res.status(404).json({ error: 'No users found.'})
        }

        res.status(200).json(usersArray);
    }
    catch(error) {
        next(error);
    }
}

// Don't need this I guess because the logged in user's data is accessible through req.user
// export const getUserById = async (req, res, next) => {
//     const id = req.params.id;
    
//     try {
//         const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//         const user = result.rows;

//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' })
//         }

//         res.status(200).json(user);
//     }
//     catch(error) {
//         next(error);
//     }
// }


export const getAllUserPalettes = async (req, res, next) => {
    //retrieve 
    console.log('hi user')
}

export const getPalettesById = async (req, res, next) => {
    console.log('hi');
}

export const createPalette = async (req, res, next) => {
    const { title, colors } = req.body;
    console.log(req.user);
    const userId = req.user.id;

    try {
        const result = await pool.query(
            "INSERT INTO palettes (title, colors, user_id) VALUES ($1, $2, $3) RETURNING *", [title, JSON.stringify(colors), userId]
        );
        const newPalette = result.rows[0];
        console.log(newPalette);

        if (!newPalette) {
            return res.status(400).json({ message: "Palette could not be created." })
        }

        return res.status(201).json(newPalette);

    }
    catch (error) {
        next(error);
    }
}

export const editPalette = async (req, res, next) => {
    console.log('hi');
}

export const deletePalette = async (req, res, next) => {
    console.log('hi');
}



// THIS PART WILL HOLD THE LOGIC- the functions and their connections to the database
// // HELPER FUNCTIONS
// // 1. Retrieve any existing palettes from json file
// async function getAllPalettes() {
//     const palettesData = await fs.readFile(palettesFilePath, 'utf-8');

//     // if there is no data in allPalettes.json, return an empty array
//     if (!palettesData.trim()) return [];
//     return JSON.parse(palettesData)
// }

// // 2. Get a specific palette
// async function getPaletteById(id) {
//     const palettes = await getAllPalettes();
//     const palette = palettes.find((palette) => palette.id === id)
        
//         if (!palette) {
//             const error = new Error(`A palette with the id of ${id} was not found`);
//             error.status = 404;
//             throw error;
//         }

//         return palette;
// }

// // 3. Create new palette
// function createPalette(requestBody) {
//     const { user, title, colors } = requestBody;

//     if (!title || !user || !Array.isArray(colors) || colors.length !== 4) {
//         return undefined
//     }

//     //Add more data validation? (make sure colors are in correct format and check for repeat/valid titles etc...)

//     return {
//         user,
//         id : Date.now(),
//         title,
//         colors
//     }
// }





// // ROUTES
// // GET all palettes
// router.get('/', async (req, res, next) => {
//     try {
//         const palettes = await getAllPalettes();
//         res.status(200).json(palettes);
//     } catch (error) {
//         next(error);
//     }
// });

// // GET specific palette
// router.get('/:id', async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     try {
//         const palette = await getPaletteById(id)
//         res.status(200).json(palette);
//     }
//     catch (error) {
//         next(error);
//     }
// })


// // POST route: create new palette
// router.post('/', async (req, res, next) => {
//     try {
//         if (!req.body) {
//             const error = new Error('Bad Request. Missing required information.')
//             error.status = 400;
//             return next(error);
//         }

//         const newPalette = createPalette(req.body);

//         if (!newPalette) {
//             const error = new Error('Bad Request. Missing required information.')
//             error.status = 400;
//             return next(error);
//         }

//         const palettes = await getAllPalettes();
//         palettes.push(newPalette);
//         await fs.writeFile(palettesFilePath, JSON.stringify(palettes, null, 2));

//         res.status(201).json({
//             data: newPalette
//         });
//     }
//     catch (error) {
//         next(error);
//     }
// });

// // PUT route to edit specific palette
// router.put('/:id/colors/:index', async (req, res, next) => {
//     const paletteId = parseInt(req.params.id);
//     const index = parseInt(req.params.index);
//     const { newColor } = req.body

//     try {
//         const palettes = await getAllPalettes();
//         const palette = palettes.find((palette) => palette.id === paletteId);

//         palette.colors[index] = newColor;

//         await fs.writeFile(palettesFilePath, JSON.stringify(palettes, null, 2));

//         res.status(200).json({ message: 'Color updated successfully', palette })
//     }
//     catch (error) {
//         console.error(error.message)
//         next(error);
//     }
// })

// // DELETE route to delete a palette
// router.delete('/:id', async (req, res, next) => {
//     const paletteId = parseInt(req.params.id);

//     try {
//         await getPaletteById(paletteId);

//         const palettes = await getAllPalettes();
//         const updatedPalettes = palettes.filter((palette) => palette.id !== paletteId);

//         await fs.writeFile(palettesFilePath, JSON.stringify(updatedPalettes, null, 2));

//         res.status(200).json({ message: 'Palette deleted successfully', updatedPalettes});
//     }
//     catch (error) {
//         next(error);
//     }
// })

