const eventController = require('./eventController');
const cityController = require('./cityController');

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
                    content: 'Test',
                    events: events,
                    cities: cities
                });
            }
        );
    }
}
