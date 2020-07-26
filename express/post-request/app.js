const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/auth/login',(req,res)=>{
    res.render('auth/login')
});
app.post('/login',(req,res)=>{
    let name = req.body.username;
    res.render('auth/isi',{nama:name})
})
app.listen(3000,()=>{
    console.log('ok')
})