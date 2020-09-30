const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const fs = require('fs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

fs.readFile('movies.txt', (err,query)=>{
    if(err) return console.log(error);

    request('https://api.themoviedb.org/3/search/movie?api_key=4870feef16cd256cdb9275c03b7387d0&language=en-US&page=1&query='+query.toString(),{timeout:0},(error,response,body)=>{
        if(error) return console.log(error);

        let movies = JSON.parse(body);


        movies.results.forEach((movie) => {
            console.log(movie.original_title)
        });
    })
})