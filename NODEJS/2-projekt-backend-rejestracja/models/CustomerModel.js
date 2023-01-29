const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required']
    },
    eventId: {
        type: String,
        required: [true, 'Event is required']
    },
    cityId: {
        type: String,
        required: [true, 'Name is required']
    }
});
module.exports = mongoose.model("Customer", CustomerModel);
