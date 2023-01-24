const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {lat: String, lng: String}
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('User', UserModel);
