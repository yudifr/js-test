const express = require('express'); //ambil express
const bodyParser = require('body-parser');
const path = require('path'); // ambil path directory
const app = express(); //panggil express
const request = require('request'); // request

app.use(express.static('public')); // public tu tempat yang digunakan contoh kayak css js(front) dsb 
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs') // makai view engine ejs disini
app.set('views',path.join(__dirname,'views')) //disini dipakai dir tadi, terus diliat bahwa file view nya ada di volder views jadi kayak e:/root/views

app.get('/results',(req,res)=>{
    let key = "4870feef16cd256cdb9275c03b7387d0";
    let query = req.query.search; // disini ambil query dari search yang dibuat sebelumnya (input text nya)
    request('https://api.themoviedb.org/3/search/movie?api_key='+key+'&query='+query,(error,response,body) =>{ // dari api ini diambil datanya, dari body yang hasilnya string (Perlu diubah ke json)
        if(error) // nah dicek sini kalau ada errornya di consolelog kan
        {
            console.log(error)
        }
        let data = JSON.parse(body); //ngubah yang hasil sebelumnya string jadi json
        // console.log(body)
        res.render('movie',{data:data,query:query}) //dipass disini query sebelumnya sama data yang diambil dari api yang udah di parse ke json
    })
    

})

app.get('/',(req,res)=>{
res.render('search')
})

app.listen(3000,()=>{
    console.log('server started')
})