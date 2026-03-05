import express from 'express';
// not using rn
import path from 'path';
import palettes from './routes/palettes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';


const app = express();
const port = process.env.PORT || 8000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Set up static folder
app.use(express.static('public'));


// Set up server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Press Ctrl+C to end this process.')
})


// Routes ... why does this work with palettes and not router?
app.use('/api/palettes', palettes);


// Error Handler middlware
app.use(notFound);
app.use(errorHandler);
