const fs = require('fs');
const {
    resolve
} = require('path');
const request = require('request-promise');

const readMovieFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (error, data) => {
            if (error) reject(error);
            resolve(data);
            
        })
    })
}

readMovieFilePromise('movies.txt')
    .then(query => {
        return 'https://api.themoviedb.org/3/search/movie?api_key=4870feef16cd256cdb9275c03b7387d0&language=en-US&page=1&query=' + query.toString()
    })
    .then(url => {
        request(url, {
                timeout: 0
            })
            .then(body => {
                let movies = JSON.parse(body);

                movies.results.forEach((movie) => {
                    console.log(movie.original_title)
                });
            })
    })
    .catch(err => {
        console.log(err)
    })