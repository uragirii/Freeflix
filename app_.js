var express = require("express"),
bodyParser = require("body-parser"),
app = express(),
session = require("express-session"),
password = require("./password")

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


// app.use(require("express-session")({
//     secret: "lol idk what to type here",
//     resave: false,
//     saveUninitialized: false
// }));

let hash = password.getSaltedPassword("apoorv")
console.log(hash)

console.log(password.authenticate("cherub", "apoorv"))

app.use(session({ secret: 'keyboard cat',  resave: false, saveUninitialized: false}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    console.log(req.session)
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.listen(3000, function(){
    console.log("Server is running")
})