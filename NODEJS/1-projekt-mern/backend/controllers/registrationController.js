const Registration = require('../models/RegistrationModel');
const User = require('../models/UserModel');
const Event = require('../models/EventModel');
const City = require('../models/CityModel');

module.exports = {
    index: (req, res) => {
        return Registration.find()
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err));
    },
    registration: (req, res) => {
        return Registration.findById(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err));
    },
    create: async (req, res) => {
        const choosedEvent = await Event.findById(req.params.eventId);
        const choosedCity = await City.findById(req.params.cityId);
        const user = await User.findById(req.params.userId);
        let newRegistration = new Registration({user: user, city: choosedCity, event: choosedEvent});
        return newRegistration.save();
    },
    delete: (req, res) => {
        return Registration.findByIdAndDelete(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err));
    }
}
