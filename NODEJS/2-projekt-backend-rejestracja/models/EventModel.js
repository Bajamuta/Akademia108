const mongoose = require("mongoose");

const EventModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventModel);
