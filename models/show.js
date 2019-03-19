var mongoose = require("mongoose");

var seriesSchema = new mongoose.Schema({
    name    : String,
    year    : String,
    season  : Number,
    episodes: Number,
    summary : String
});

module.exports = mongoose.model("Series",seriesSchema);