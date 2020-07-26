const express = require('express')
const app = express()


app.get('/',(req,res) =>{
    res.send('<a href="/test">test </a>')
})

app.get('/test/:id/:name',(req,res)=>{
    let userId = req.params.id;
    let userName = req.params.name;
    res.render('index.ejs',{
        id : userId,
        name : userName
    });
})
app.get('*',(req,res)=>{
    console.log(req);
    res.send('404')
})

app.listen(3000,()=>{
    console.log('apa')
})

