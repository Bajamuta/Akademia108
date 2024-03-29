const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const helpers = require('./lib/helpers');

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/express-users");
app.use(express.static('public'));
app.engine("hbs", hbs.engine({extname: 'hbs', defaultLayout: 'main', helpers: helpers}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'My app title',
        content: 'Lorem ipsum'
    });
});

app.get('/users', (req, res) => {
    User.find().exec((err, result) => {
        console.log(result);
        if (err)
        {
            res.send('An error has occurred: ' + err);
        }
        else
        {
            res.render('users', {
                title: 'Users\' list',
                content: 'lorem ipsum',
                users: result
            });
        }
    })
})

app.listen(8080, () => console.log('Serwer Node.Js działa'));
