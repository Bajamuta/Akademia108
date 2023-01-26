const eventController = require('./eventController');
const cityController = require('./cityController');

module.exports = {
    home: (req, res) => {
        const events = eventController.index(req, res);
        const cities = cityController.index(req, res);
        console.log('here', events, cities)
    }
}
