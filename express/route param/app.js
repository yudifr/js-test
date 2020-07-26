const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('halo')
});
app.get('/question/:id/:title&:name',(req,res)=>{
    let name = req.params.name;
    let title = req.params.title;
    res.send("nama = "+name+", judul = "+title);
});
app.get('*',(req,res)=>{
    res.send('salahbos')
});
app.listen(3000);