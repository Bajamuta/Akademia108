const eventController = require('./eventController');
const cityController = require('./cityController');
const customerController = require('./customerController');
const userController = require('./userController');
const {check, validationResult} = require('express-validator');
const e = require("express");

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
                        cities = cities.map(
                            (cit) => {
                                cit.selected = cit._id.toString() === customer.cityId;
                                return cit;
                            }
                        );
                        return eventController.index(req, res);
                    }
                )
            .then(
                (result) => {
                    events = result;
                    events = events.map(
                        (ev) => {
                            ev.selected = ev._id.toString() === customer.eventId;
                            return ev;
                        });
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
                        cities = cities.map(
                            (cit) => {
                                cit.selected = cit._id.toString() === customer.cityId;
                                return cit;
                            }
                        );
                        return eventController.index(req, res);
                    }
                )
                .then(
                    (result) => {
                        events = result;
                        events = events.map(
                            (ev) => {
                                ev.selected = ev._id.toString() === customer.eventId;
                                return ev;
                            }
                        )
                    }
                )
                .finally(
                    () => {
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
    },
    userForm: (req, res) => {
        res.render('user', {
            title: 'User create',
            content: 'Please fill the form below',
            action: '/user',
            button: "Submit",
            request: {},
            errors: []
        })
    },
    checkUserForm: [
        check('username')
            .trim()
            .isLength({min: 3, max: 50})
            .withMessage('Must contain between 3 and 50 characters'),
        check('email')
            .trim()
            .isEmail()
            .withMessage('Must be an valid email address'),
        check('password')
            .trim()
            .isLength({min: 10, max: 100})
            .withMessage('Must contain between 10 and 100 characters'),
        check('password')
            .isStrongPassword()
            .withMessage('Must be a strong password')
    ],
    createUser: async (req, res) => {
        const errors = validationResult(req);
        let user;
        if (!errors.isEmpty())
        {
            res.render('user', {
                title: 'User create',
                content: 'The form contains errors!',
                action: '/user',
                button: "Submit",
                request: req,
                errors: errors
            });
        }
        else
        {
            userController.create(req, res)
                .then(
                    (result) => {
                        user = result;
                        res.redirect('/');
                    }
                )
                .catch(
                    (err) => {
                        console.error('An error has occurred', err);
                        res.render('user', {
                            title: 'User create',
                            content: 'An error has occurred...',
                            action: '/user',
                            button: "Submit",
                            request: req,
                            errors: errors
                        });
                    }
                )
                .finally(
                    () => {
                        // res.redirect('/');
                    }
                )
        }
    }
}
