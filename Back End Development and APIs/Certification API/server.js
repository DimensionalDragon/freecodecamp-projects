const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const {DB_URI} = process.env;

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

const mongoose = require('mongoose');
mongoose.connect(DB_URI);
const db = mongoose.connection;
db.on('error', (err) => console.error('[Error]', err));
db.once('open', () => console.log('Connected to database'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome!');
})

// Timestamp Microservice
app.get('/timestamp', (req, res) => {
    res.sendFile(__dirname + '/views/timestamp.html');
})
const timestampRouter = require('./routes/timestamp.js');
app.use('/timestamp', timestampRouter);

// Request Header Parser Microservice
app.get('/header-parser', (req, res) => {
    res.sendFile(__dirname + '/views/header-parser.html');
})
const headerParserRouter = require('./routes/headerParser.js');
app.use('/header-parser', headerParserRouter);

// URL Shortener Microservice
app.get('/url-shortener', (req, res) => {
    res.sendFile(__dirname + '/views/url-shortener.html');
})
const urlShortenerRouter = require('./routes/urlShortener.js');
app.use('/url-shortener', urlShortenerRouter);

// Exercise Tracker Microservice
app.get('/exercise-tracker', (req, res) => {
    res.sendFile(__dirname + '/views/exercise-tracker.html');
})
const exerciseTrackerRouter = require('./routes/exerciseTracker.js');
app.use('/exercise-tracker', exerciseTrackerRouter);

// File Metadata Microservice
app.get('/file-metadata', (req, res) => {
    res.sendFile(__dirname + '/views/file-metadata.html');
})
const fileMetadataRouter = require('./routes/fileMetadata.js');
app.use('/file-metadata', fileMetadataRouter);

app.listen(port, () => console.log(`Server Started on port ${port}`))