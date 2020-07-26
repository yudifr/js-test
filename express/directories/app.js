const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    let question = [
        {title: "node",user:"yotaro"},
        {title: "express",user:"Nowaru"},
        {title: "mongodb",user:"Udin"},
        
    ]
    res.render('index',{questions:question})
    
})
app.listen(3000,()=>{
    console.log('conn activated')
})