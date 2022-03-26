const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: {
        type: Number,
        unique: true,
        required: true,
        default: () => Math.floor(Math.random() * 100000)
    }
});

module.exports = mongoose.model('Link', linkSchema);