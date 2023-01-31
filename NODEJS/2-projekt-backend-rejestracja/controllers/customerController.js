const Customer = require('../models/CustomerModel');

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
    create: (req, res) => {
        let newCustomer = new Customer({...req.body});
        return newCustomer.save();
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
        return Customer.findByIdAndUpdate(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err))
    },
    remove: (req, res) => {
        return Customer.findByIdAndDelete(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err))
    }

}
