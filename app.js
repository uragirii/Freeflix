var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express(),
Series = require("./models/show");

// APP Config
mongoose.connect("mongodb://localhost:27017/freeflix", {useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.send("Just a test page");
});

app.listen(3000, function(){
    console.log("Server is running !!");
})