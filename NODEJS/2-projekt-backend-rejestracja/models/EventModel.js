const mongoose = require("mongoose");

const EventModel = new mongoose.Schema({
    _id: String,
    name: String,
    date: Date,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventModel);
