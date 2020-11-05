const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');

// const multer = require('multer');
const methodOverride = require('method-override');

const imageRouter = require('./routes/images')
const env = require('dotenv');
env.config({
    path: './config.env',
});
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

    
app.use(imageRouter);


 

app.listen(process.env.PORT, () => {
    console.log('started');
});