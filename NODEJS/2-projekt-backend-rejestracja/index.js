const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const helpers = require('./lib/helpers');
const routers = require('./routes/routes');

mongoose.set('strictQuery', true);

// Define the database URL to connect to.
const mongoDB = "mongodb://localhost:27017/registration";

app.use(express.static('public'));
app.use('', routers);
app.engine("hbs", hbs.engine({extname: 'hbs', defaultLayout: 'main', helpers: helpers}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//// @@@!!! https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms


// Wait for database to connect, logging an error if there is a problem
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoDB);
}

app.listen(8080, () => console.log('Serwer Node.Js działa'));
