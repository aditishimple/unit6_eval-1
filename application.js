const express = require('express');
const PORT = 9000;
const app = express();

function logger(req, res, next){
    console.log(req.url);
    next();
}

let response = {};

function checkPermission(req, res, next){
    if(req.url === '/authors'){
        response["route"] = '/authors';
        response["permission"] = true;
    }
    if(req.url === '/libraries'){
        response["route"] = '/libraries';
        response["permission"] = true;
    }
    next();
}

app.use(logger);

app.get("/books",(req,res,next)=>{
    res.send({route:"/books"})
    next();
})
app.get("/libraries",checkPermission,(req,res,next)=>{
    res.send(response)
    next();
})
app.get("/authors",checkPermission,(req,res,next)=>{
    res.send(response)
    next();
})

app.listen(PORT,()=>{
    console.log(`SERVER PORT NUMBER: ${PORT}`)
})