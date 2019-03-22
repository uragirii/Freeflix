var mongoose = require("mongoose");
var Show = require("./models/show");
var Comment = require("./models/comment");

//     name    : String,
//     year    : String,
//     summary : String,
//     albumArt: String
//     imdb    : String,
//     seasons : [             // Stored as [{"Season 1": 10}, {"Season  2":12}, ...]
//              {
//                  season : String,
//                  episodes : Number
//              }
//          ]
//     watchTime : Number,     // Watch Time in minutes per episode
//     genres    : String,

var data = [
    {
        name    : "The Game of Thrones",
        year    : "2011",
        summary : "In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.",
        albumArt: "https://imagesvc.timeincapp.com/v3/fan/image?url=https://winteriscoming.net/wp-content/blogs.dir/385/files/2017/05/GoT-S7-Key-Art-630x933.jpg&w=630",
        imdb    : "9.5",
        seasons : [
            10, 10, 10, 10, 10, 10, 7
        ],
        watchTime: 57,
        genres   :  "Action, Adventure, Drama, Fantasy, Romance"
    },
    {
        name    : "Friends",
        year    : "1994",
        summary : "Rachel Green, Ross Geller, Monica Geller, Joey Tribbiani, Chandler Bing and Phoebe Buffay are six 20 something year-olds, living off of one another in the heart of New York City. Over the course of ten years, this average group of buddies goes through massive mayhem, family trouble, past and future romances, fights, laughs, tears and surprises as they learn what it really means to be a friend.",
        albumArt: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_QL50_.jpg",
        imdb    : "8.9",
        seasons :[
            24, 24, 25, 24, 24, 25, 24, 24, 23, 18
        ],
        watchTime : 22,
        genres   : "Comedy, Romance"
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
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Comments deleted");
        }
    })
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