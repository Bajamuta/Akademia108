const customerController = require('./customerController');
const eventController = require('./eventController');
const cityController = require('./cityController');

module.exports = {
    home: (req, res) => {
        let customers;
        customerController.index(req, res)
            .then(
                (result) => {
                    customers = result;
                    customers.map(
                        async (cust) => {
                            cust.event = await eventController.event({params: {id: cust.eventId}}, res);
                            cust.city = await cityController.city({params: {id: cust.cityId}}, res);
                        }
                    )
                    res.render('home', {
                        title: 'Home',
                        content: 'Welcome',
                        customers: customers
                    })
                }
            )
            .catch(
                (err) => console.error(err)
            )
    }
}
