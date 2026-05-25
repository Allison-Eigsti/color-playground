import express from 'express';
import palettesRouter from './src/routes/palettesRouter.js';
import setupRouter from './src/routes/setupRouter.js';
import logger from './src/middleware/logger.js';
import errorHandler from './src/middleware/error.js';
import notFound from './src/middleware/notFound.js';
import pool from './src/config/db.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Set up static folder
app.use(express.static('public'));

// Routes
app.use('/api', setupRouter);
app.use('/api/palettes', palettesRouter);

// Error Handler middlware (note to self: must come after routes)
app.use(notFound);
app.use(errorHandler);


// Set up server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Press Ctrl+C to end this process.')
})
