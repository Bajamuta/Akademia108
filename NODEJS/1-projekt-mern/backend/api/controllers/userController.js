const User = require('../../models/UserModel');
const Event = require("../../models/EventModel");
const City = require("../../models/CityModel");
const Registration = require("../../models/RegistrationModel");
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        User.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newUser = new User({...req.body});
        newUser.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    user: (req, res) => {
        User.findById(req.params.id).populate('registrations')
            .then((user) => {
                const userDTO = {
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    email: user.email,
                    id: user._id,
                    registrations: user.registrations,
                    avatarUrl: user.avatarUrl,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
                res.json(userDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    registerForEvent: async (req, res) => {
        console.log('BODY', req.body);
        const choosedEvent = await Event.findById(req.body.eventId);
        const choosedCity = await City.findById(req.body.cityId);
        const user = await User.findById(req.body.userId);
        let newRegistration = new Registration({user: user, city: choosedCity, event: choosedEvent});
        return newRegistration.save().then(
            (registrationResult) => {
                user.registrations.push(registrationResult._id);
                user.save();
                return res.json({result: 'Registered'})
            }
        )
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO podczas rejestracji na event ogarnąć relacje wiele do wielu*/
}
