const eventController = require('./eventController');
const cityController = require('./cityController');
const customerController = require('./customerController');

module.exports = {
    home: (req, res) => {
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
                    cities: cities
                });
            }
        );
    },
    register: (req, res) => {
        let cust;
        customerController.create(req, res)
            .then(
                (result) => cust = result
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
