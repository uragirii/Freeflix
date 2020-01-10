var express = require("express"),
bodyParser = require("body-parser"),
bcrypt = require("bcryptjs"),
app = express(),
session = require("express-session")
// password = require("./password")

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())


// app.use(require("express-session")({
//     secret: "lol idk what to type here",
//     resave: false,
//     saveUninitialized: false
// }));



app.use(session({ secret: 'idk, something secret i guess',  resave: false, saveUninitialized: false}))

// Access the session as req.session
app.get('/', function(req, res, next) {
    if (req.session.user){
        res.send("You are logged in")
    }
    else{
        res.send("Please log in")
    }
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// res.render("new.ejs")
})

app.post("/", function(req, res){
    let pass = req.body.pass;
    console.log(req.body)
    // Check the password with the "cherub"
    bcrypt.hash(pass, 10, function(err, hash){
        console.log(hash);
        bcrypt.compare('apoorv', hash, function(err, resp){
            if (resp){
                console.log("Passwords matched")
                req.session.user = {}
                req.session.user.username = "cherub"
                res.redirect("/")
            }
            else{
                console.log("Passwords don't match")
                res.redirect("/")
            }
        })
    })
})
app.get("/logout", function(req, res){
    req.session.destroy((err)=>{
        if(!err){
            res.redirect("/")
        }
    })
})

app.listen(3000, function(){
    console.log("Server is running")
})