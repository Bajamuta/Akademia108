const mongoose = require("mongoose");

const CityModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('City', CityModel);
