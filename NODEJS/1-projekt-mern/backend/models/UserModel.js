const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
    password: {
        type: String,
        required: [true, 'Password is required']
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

/*FOR SECURITY REASON - ENCRYPT THE PASSWORD*/
UserModel.pre('save', (next) => {
    const user = this;
    console.log('here', user);
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
        {
            return next();
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
            {
                return next();
            }
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserModel);
