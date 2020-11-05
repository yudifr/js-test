const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    url: String,
});

module.exports = mongoose.model('Image', Image);