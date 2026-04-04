import express from 'express';
import palettesRouter from './routes/palettesRouter.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';


const app = express();
const port = 8000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Set up static folder
app.use(express.static('public'));

// Routes
app.use('/api/palettes', palettesRouter);

// Error Handler middlware (note to self: must come after routes)
app.use(notFound);
app.use(errorHandler);


// Set up server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Press Ctrl+C to end this process.')
})
