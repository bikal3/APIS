const express= require("express");
const cors= require("cors");
const bodyParser=require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get("/",function(req,res){
    res.send("blaba");
})

app.listen(5000);