const mongoose = require("mongoose");

const AddressModel = new mongoose.Schema({
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {lat: String, lng: String}
});

module.exports = mongoose.model('Address', AddressModel);
