const eventController = require('./eventController');
const cityController = require('./cityController');
const customerController = require('./customerController');
const {check, validationResult} = require('express-validator');

module.exports = {
    form: (req, res) => {
        let events;
        let cities;
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
                    action: '/register',
                    events: events,
                    cities: cities,
                    button: "Submit",
                    request: {},
                    errors: [],
                    customer: {}
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
                            action: '/register',
                            events: events,
                            cities: cities,
                            button: 'Submit',
                            request: req,
                            errors: errors,
                            customer: {}
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
                        res.redirect('/');
                    }
                )
        }
    },
    updateForm: (req, res) => {
        let customer;
        let events;
        let cities;
        customerController.customer(req, res)
            .then(
                (result) => {
                    customer = result;
                    return cityController.index(req, res);
                }
            )
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
                    res.render('register', {
                        title: 'Update registration',
                        content: 'Make changes',
                        action: '/register/update/' + customer._id,
                        events: events,
                        cities: cities,
                        button: 'Update',
                        request: {},
                        errors: [],
                        customer: customer
                    });
                }
            )
    },
    update: (req, res) => {
        let customer;
        const errors = validationResult(req);
        let events;
        let cities;
        if (!errors.isEmpty())
        {
            customerController.customer(req, res)
                .then(
                    (result) => {
                        customer = result;
                        return cityController.index(req, res);
                    }
                )
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
                            title: 'Update registration',
                            content: 'The form contains errors!',
                            action: '/register/update/' + customer._id,
                            events: events,
                            cities: cities,
                            button: 'Update',
                            request: req,
                            errors: errors,
                            customer: customer
                        });
                    }
                );
        }
        else {
            customerController.update(req, res)
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
                        res.redirect('/');
                    }
                )
        }
    }
}
