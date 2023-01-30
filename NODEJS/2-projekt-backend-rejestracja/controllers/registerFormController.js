const eventController = require('./eventController');
const cityController = require('./cityController');
const customerController = require('./customerController');
const {check, validationResult} = require('express-validator');

module.exports = {
    form: (req, res) => {
        let events;
        let cities;
        // eventController.index(req, res);
        cityController.index(req, res)
            .then(
                (result) => {
                    cities = result;
                    return eventController.index(req, res);
                }
            )
            .then(
                (result) => {
                    events = result;
                }
            )
            .finally(
            () => {
                // console.log('here', events, cities);
                res.render('register', {
                    title: 'Registration',
                    content: 'Please fill the form below',
                    events: events,
                    cities: cities,
                    request: {},
                    errors: []
                });
            }
        );
    },
    check: [
        check('name')
            .trim()
            .isLength({min: 3, max: 50})
            .withMessage('Must contain between 3 and 50 characters'),
        check('surname')
            .trim()
            .isLength({min: 2, max: 100})
            .withMessage('Must contain between 2 and 100 characters')
    ],
    register: async (req, res) => {
        let customer;
        const errors = validationResult(req);
        let events;
        let cities;
        if (!errors.isEmpty())
        {
            cityController.index(req, res)
                .then(
                    (result) => {
                        cities = result;
                        return eventController.index(req, res);
                    }
                )
                .then(
                    (result) => {
                        events = result;
                    }
                )
                .finally(
                    () => {
                        // console.log('here', events, cities);
                        res.render('register', {
                            title: 'Registration',
                            content: 'The form contains errors!',
                            events: events,
                            cities: cities,
                            request: req,
                            errors: errors
                        });
                    }
                );
        }
        else {
            customerController.create(req, res)
                .then(
                    (result) => {
                        customer = result;
                    }
                )
                .catch(
                    (err) => console.error('An error has occurred', err)
                )
                .finally(
                    () => {
                        res.render('home', {
                            title: 'Home',
                            content: 'You have been successfully registered'
                        })
                    }
                )
        }
    }
}
