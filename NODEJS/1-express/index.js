const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/UserModel");

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/express-users");
app.use(express.static('public'));
app.engine("hbs", hbs.engine({extname: 'hbs', defaultLayout: 'main'}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'My app title',
        content: 'Lorem ipsum'
    });
});

app.listen(8080, () => console.log('Serwer Node.Js działa'));
