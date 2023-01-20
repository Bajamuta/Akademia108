const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Witaj programisto!')
});

app.listen(8080, () => console.log('Serwer Node.Js działa'));

// uruchamianie nodemon: npm start lub npx nodemon
