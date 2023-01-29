const Customer = require('../models/CustomerModel');

module.exports = {
    register: (req, res) => {
        let newCustomer = new Customer({...req.body});
        return newCustomer.save();
    }

}
