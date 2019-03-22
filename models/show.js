var mongoose = require("mongoose");

var showSchema = new mongoose.Schema({
    name    : String,
    year    : String,
    summary : String,
    imdb    : String,
    seasons : [             // Stored as [{"Season 1": 10}, {"Season  2":12}, ...]
        {
            type : Number
        }
    ],
    watchTime : Number,     // Watch Time in minutes per episode
    genres    : String,
    albumArt: String,
    comments:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Comment" 
        }
    ]
});

module.exports = mongoose.model("Show",showSchema);