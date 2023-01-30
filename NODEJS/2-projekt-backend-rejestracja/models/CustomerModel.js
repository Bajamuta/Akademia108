const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema({
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
        required: [true, 'EventId is required']
    },
    cityId: {
        type: String,
        required: [true, 'CityId is required']
    }
});
module.exports = mongoose.model("Customer", CustomerModel);
