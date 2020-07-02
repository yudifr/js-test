// const http = require('http');
// //casual here is just like faker on php
// const casual = require('casual');

// const server = http.createServer((req,res)=>{
// res.end(casual.name); // do remember, you can pass html here
// });

// server.listen(3000, ()=>{
//     console.log('YOSHA');
// });

// to create package.json 
// you need to run npm init on terminal 

let fs = require('fs');
// ASYNC example, so here, it will read the file first, end then continue to do other thing, and later it will 
fs.readFile('contoh.txt',(error,data)=>{
    //do this
    if(error) return console.error(error)
    
    console.log(data.toString());
});

console.error('a')