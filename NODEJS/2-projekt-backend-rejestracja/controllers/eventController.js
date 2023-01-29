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
        Event.findById(req.params.id)
            .lean()
            .exec((err, event) => {
                if (!err)
                {
                    res.send(event);
                }
                else
                {
                    res.send('Cannot find event: ' + err);
                }
            })
    },
    create: (req, res) => {
        let newEvent = new Event({...req.body});
        newEvent.save().then((r) => res.send(r)).catch((err) => res.send('Cannot create event: ' + err));
    },
    update: (req, res) => {
        Event.findByIdAndUpdate(req.params.id)
            .lean()
            .exec((err, event) => {
                if (!err)
                {
                    res.send(event);
                }
                else
                {
                    res.send('Cannot update event: ' + err);
                }
            })
    },
    delete: (req, res) => {
        Event.findByIdAndDelete(req.params.id)
            .lean()
            .exec((err) => {
                if (!err)
                {
                    res.send('Success');
                }
                else
                {
                    res.send('Cannot delete event: ' + err);
                }
            })
    }
};
