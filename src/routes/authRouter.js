import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();


// ROUTES
// AUTHENTIFICATION AND AUTHORIZATION
router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required'});
    };

    try {
        const hash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", 
            [email, hash]);

        return res.status(201).json(result.rows[0]);
    }
    
    catch (error) {
    if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already in use' });
    }
    next(error);
    }
});


export default router;