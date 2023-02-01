const Event = require("../models/EventModel");

module.exports = {
    index: (req, res) => {
        return Event.find()
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err))
    },
    event: (req, res) => {
        return Event.findById(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err))
    },
    create: (req, res) => {
        let newEvent = new Event({...req.body});
        return newEvent.save();
    },
    update: (req, res) => {
        return Event.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err))
    },
    delete: (req, res) => {
        return Event.findByIdAndDelete(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err))
    }
};
