const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

let key = "4870feef16cd256cdb9275c03b7387d0";

app.get('/',(req,res)=>{
    let query = req.query.search;
    request('api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}',(error,res,body) =>{
        if(error)
        {
            console.log(error)
        }
        let data = JSON.parse(body);
        res.render('search',{data:data})
    })
    

})

app.get('/results/',(req,res)=>{
res.render('movie')
})

app.listen(3000,()=>{
    console.log('server started')
})