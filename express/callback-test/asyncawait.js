const fs = require('fs');
const request = require('request-promise')

const readFile = (name) => {
    return new Promise((resolve, reject) => {
        fs.readFile(name, (error, data) => {
            if (error) reject(error);
            resolve(data)

        })
    })
}

const getMovie = async () => {
    try {
        let query = await readFile('movies.txt')

        let url = 'https://api.themoviedb.org/3/search/movie?api_key=4870feef16cd256cdb9275c03b7387d0&language=en-US&page=1&query=' + query.toString()

        await request(url, {
                timeout: 0
            })
            .then(body => {
                let movies = JSON.parse(body);

                movies.results.forEach((movie) => {
                    console.log(movie.original_title)
                })

            })
    } catch (error) {
        console.log(error)
    }


}

getMovie();