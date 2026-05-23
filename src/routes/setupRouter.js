import express from 'express';
import pool from '../config/db.js';


const router = express.Router();

// Setup tables

router.get('/setup', async (req, res, next) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        await pool.query(`

            CREATE TABLE IF NOT EXISTS palettes (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                colors JSONB NOT NULL,
                user_id INT REFERENCES users(id)
            );
        `);
        res.status(200).json({ message: 'Tables created successfully.' });
    } catch(error) {
        next(error);
    };
});

export default router