const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const helpers = require('./lib/helpers');
const Event = require('./models/EventModel');
const City = require('./models/CityModel');

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/registration");
app.use(express.static('public'));
app.engine("hbs", hbs.engine({extname: 'hbs', defaultLayout: 'main', helpers: helpers}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        content: 'Welcome'
    });
});

app.get('/register', (req, res) => {
    Event.find().exec((err, events) => {
        if (!err)
        {
            City.find().exec((err, cities) => {
                if (!err)
                {
                    res.render('register', {
                        title: 'Registration',
                        content: 'Register for our event!',
                        events: events,
                        cities: cities
                    });
                }
                else
                {
                    res.send('An error has occurred during retrieving cities\' data: ' + err);
                }
            });
        }
        else
        {
            res.send('An error has occurred during retrieving events\' data: ' + err);
        }
    })

});

app.listen(8080, () => console.log('Serwer Node.Js działa'));
