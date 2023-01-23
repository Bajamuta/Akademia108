const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require("path");

/*
app.get('/', (req, res) => {
    res.send('Witaj programisto!');
});
app.get('/user/:id', (req, res) => {
   res.send('Tutaj user id: ' + req.params.id);
});
app.get('/user/:id?/:name?', (req, res) => {
    res.send('Tutaj user opcjonalny: ' + req.params.id);
});
// QUERY
app.get('/data', (req, res) => {
    res.send('Tutaj query: ' + req.query.search + ' ' + req.query.model);
});
*/

// we can add prefix to our path
// app.use('/test', express.static('/public'));
app.use(express.static('/public'));

// views and view engine
app.engine("hbs", hbs.engine({extname: 'hbs', defaultLayout: 'main'}));
app.set("view engine", "hbs");

// IMPORTANT + file hierarchy!
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'My app title',
        content: 'Lorem ipsum'
    });
});

app.listen(8080, () => console.log('Serwer Node.Js działa'));

// to run nodemon: npm start (need to configure) or npx nodemon PATH_TO/index.js
