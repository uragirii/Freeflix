var mongoose = require("mongoose");

var showSchema = new mongoose.Schema({
    name    : String,
    year    : String,
    summary : String,
    albumArt: String,
    comments:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Comment" 
        }
    ]
});

module.exports = mongoose.model("Show",showSchema);