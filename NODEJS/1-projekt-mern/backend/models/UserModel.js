const mongoose = require("mongoose");
const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Should contains minimum 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    avatarUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', UserModel);
