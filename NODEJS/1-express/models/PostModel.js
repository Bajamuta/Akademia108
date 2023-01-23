const mongoose = require("mongoose");
const PostModel = new mongoose.Schema({
    title: String,
    content: String,
    author: String
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Post', PostModel);
