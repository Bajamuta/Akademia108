const mongoose = require("mongoose");

const CityModel = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('City', CityModel);
