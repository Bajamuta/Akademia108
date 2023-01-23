const express = require('express');
const app = express();

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

/*app.get('/', (req, res) => {
    res.send('Witaj programisto!');
});*/

// we can add prefix to our path
app.use('/test', express.static(__dirname + '/public'));

app.listen(8080, () => console.log('Serwer Node.Js działa'));

// uruchamianie nodemon: npm start lub npx nodemon
