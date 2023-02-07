const Customer = require('../models/CustomerModel');
const {validationResult} = require("express-validator");
const cityController = require("./cityController");
const eventController = require("./eventController");

module.exports = {
    index: (req, res) => {
        return Customer.find()
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err))
    },
    registerCustomer: (req, res) => {
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
                            content: 'The customerForm contains errors!',
                            action: '/registerCustomer',
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
            let newCustomer = new Customer({...req.body});
            newCustomer
                .save()
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
    customer: (req, res) => {
      return Customer.findById(req.params.id)
          .lean()
          .then(
              (result) => {
                  return result;
              }
          )
          .catch((err) => console.log('error', err))
    },
    update: (req, res) => {
        let customer;
        const errors = validationResult(req);
        let events;
        let cities;
        if (!errors.isEmpty())
        {
            Customer.findById(req.params.id)
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
                            content: 'The customerForm contains errors!',
                            action: '/registerCustomer/update/' + customer._id,
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
            Customer.findByIdAndUpdate(req.params.id, req.body)
                .lean()
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
    unregisterCustomer: (req, res) => {
        Customer.findByIdAndDelete(req.params.id)
            .lean()
            .then(
                (result) => {
                    res.redirect('/')
                }
            )
            .catch((err) => console.log('error', err))
    }

}
