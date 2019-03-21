var mongoose = require("mongoose");
var Show = require("./models/show");
var Comment = require("./models/comment");

//     name    : String,
//     year    : String,
//     summary : String,
//     albumArt: String
var data = [
    {
        name    : "The Game of Thrones",
        year    : "2011",
        summary : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        albumArt: "https://imagesvc.timeincapp.com/v3/fan/image?url=https://winteriscoming.net/wp-content/blogs.dir/385/files/2017/05/GoT-S7-Key-Art-630x933.jpg&w=630",
    },
    {
        name    : "True Detective",
        year    : "2015",
        summary : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
        albumArt: "https://m.media-amazon.com/images/M/MV5BMTY0ODc2NTc0NF5BMl5BanBnXkFtZTgwMDcyNTAwNzM@._V1_QL50_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
        name    : "Friends",
        year    : "1994",
        summary : "Six Friends, day to day sitcom, awesome sitcom",
        albumArt: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_QL50_.jpg"
    }
]
function seedDB(){
    // Removing all the predata,
    Show.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Show Database Cleared");
        }
    });
    data.forEach(function(show){
        Show.create(show, function(err, newShow){
            if(err){
                console.log(err);
            }
            else{
                console.log("New Show has been added");
                Comment.create({
                    author : "Cherub",
                    comment: "This is just a random comment."
                },function(err, newComment){
                    if(err){
                        console.log(err);
                    }
                    else{
                        newShow.comments.push(newComment);
                        newShow.save();
                        console.log("Added a new comment");
                    }
                });
            }
        });
    });
};
module.exports = seedDB;