const City = require('../models/CityModel');

module.exports = {
    index: (req, res) => {
        City.find()
            .lean()
            .exec((err, cities) => {
                if (!err)
                {
                    res.send(cities);
                }
                else
                {
                    res.send('An error has occurred during retrieving cities\' data: ' + err);
                }
            });
    },
    city: (req, res) => {
        City.findById(req.params.id)
            .lean()
            .exec((err, city) => {
                if (!err)
                {
                    res.send(city);
                }
                else
                {
                    res.send('Cannot find city: ' + err);
                }
            });
    },
    create: (req, res) => {
        let newCity = new City({...req.body});
        newCity.save().then((r) => res.send(r)).catch((err) => res.send('Cannot create city: ' + err));
    },
    update: (req, res) => {
        City.findByIdAndUpdate(req.params.id)
            .lean()
            .exec((err, city) => {
                if (!err)
                {
                    res.send(city);
                }
                else
                {
                    res.send('Cannot update city: ' + err);
                }
            });
    },
    delete: (req, res) => {
        City.findByIdAndDelete(req.params.id)
            .lean()
            .exec((err) => {
                if (!err)
                {
                    res.send('Success');
                }
                else
                {
                    res.send('Cannot delete city: ' + err);
                }
            });
    }

}
