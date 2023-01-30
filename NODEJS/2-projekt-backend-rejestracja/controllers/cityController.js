const City = require('../models/CityModel');

module.exports = {
    index: (req, res) => {
        return City.find()
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('err', err))
    },
    city: (req, res) => {
        return City.findById(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err));
    },
    create: (req, res) => {
        let newCity = new City({...req.body});
        return newCity.save();
    },
    update: (req, res) => {
        return City.findByIdAndUpdate(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err));
    },
    delete: (req, res) => {
        return City.findByIdAndDelete(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('error', err));
    }

}
