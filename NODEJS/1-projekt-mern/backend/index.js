const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const helpers = require('./lib/helpers');
const routers = require('./routes/routes');
const apiRoutes = require('./api/routes/apiRoutes');
const cors = require("cors");

mongoose.set('strictQuery', true);

// Define the database URL to connect to.
const mongoDB = "mongodb://localhost:27017/mern";

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('', routers);
app.use('', apiRoutes);
app.engine("hbs", hbs.engine({extname: 'hbs', defaultLayout: 'main', helpers: helpers}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//// @@@!!! https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
// app.all('*', requireAuthentication, loadUser) /// https://expressjs.com/en/api.html


// Wait for database to connect, logging an error if there is a problem
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoDB);
}

app.listen(8080, () => console.log('Serwer Node.Js działa'));
