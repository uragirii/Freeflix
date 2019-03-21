var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
app = express(),
Show = require("./models/show"),
User = require("./models/user"),
seedDB = require("./seeds");

// APP Config
mongoose.connect("mongodb://localhost:27017/freeflix", {useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

// Passport Congiguration
app.use(require("express-session")({
    secret: "lol idk what to type here",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/shows",function(req, res){
    Show.find({}, function(err,shows){
        if(err){
            console.log(err);
        }
        else{
            res.render("shows", {shows:shows});
        }
    });
});
app.get("/shows/:id", function(req, res){
    Show.findById(req.params.id).populate("comments").exec(function(err, show){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {show: show});
        }
    });
});


// Sign up Route

app.get("/signup",function(req, res){
    res.render("signup");
});

// Post handing of Signup

app.post("/signup", function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/shows");
        });
    });
});

//Login Route 

app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect : "/shows",
    failureRedirect : "/signup"
}), function(req, res){
    res.redirect("/shows");
});

app.get("/logout", function(req, res){
    req.logout();
    console.log("Logged OUt");
    res.redirect("/shows");
})

function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

app.listen(3000, function(){
    console.log("Server is running !!");
})