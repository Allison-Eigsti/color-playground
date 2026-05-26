import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/authenticateToken.js';
import dotenv from 'dotenv';
dotenv.config();

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

        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", 
            [email, hash]);

        return res.status(201).json(newUser.rows[0]);
    }
    
    catch (error) {
    if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already in use' });
    }
    next(error);
    }
});


router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    // Authenticate user with bcrypt compare
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", 
        [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'User not found.' })
        }

        if(await bcrypt.compare(password, user.password)) {
            // res.status(200).json({ message: 'Login successful' });
            // Issue JWT
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    }
    catch (error) {
        next(error);
    }
});

export default router;