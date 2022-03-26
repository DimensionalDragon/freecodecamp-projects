const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

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


app.listen(port, () => console.log(`Server Started on port ${port}`))