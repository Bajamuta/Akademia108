const mongoose = require("mongoose");

const CityModel = new mongoose.Schema({
    id: Number,
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('City', CityModel);
