const eventController = require('./eventController');
const cityController = require('./cityController');
const customerController = require('./customerController');
const {check} = require('express-validator');
const e = require("express");

module.exports = {
    customerForm: (req, res) => {
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
                    content: 'Please fill the customerForm below',
                    action: '/registerCustomer',
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
    checkCustomerForm: [
        check('name')
            .trim()
            .isLength({min: 3, max: 50})
            .withMessage('Must contain between 3 and 50 characters'),
        check('surname')
            .trim()
            .isLength({min: 2, max: 100})
            .withMessage('Must contain between 2 and 100 characters')
    ],
    updateCustomerForm: (req, res) => {
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
                        action: '/registerCustomer/update/' + customer._id,
                        events: events,
                        cities: cities,
                        button: 'Update',
                        request: {},
                        errors: [],
                        customer: customer
                    });
                }
            )
    }
}
