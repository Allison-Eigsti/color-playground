import express from 'express';


const app = express();
const port = process.env.PORT || 8000;


// Set up static folder
app.use(express.static('public'));



// Set up server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Press Ctrl+C to end this process.')
})