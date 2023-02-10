const mongoose = require("mongoose");

const RegistrationModel = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

RegistrationModel.pre('find', function (next) {
    this.populate("event city user");
    next();
});

module.exports = mongoose.model('Registration', RegistrationModel);
