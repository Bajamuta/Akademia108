const mongoose = require("mongoose");
const UserModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    isActive: Boolean,
    hobby: []
},
    {
        timestamps: true
    });
module.exports = mongoose.model('User', UserModel);
