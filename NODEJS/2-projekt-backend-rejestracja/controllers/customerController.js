const Customer = require('../models/CustomerModel');

module.exports = {
    create: (req, res) => {
        let newCustomer = new Customer({...req.body});
        return newCustomer.save();
    }

}
