const mongoose = require("mongoose");

const EventModel = new mongoose.Schema({
    id: Number,
    name: String,
    date: Date,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventModel);
