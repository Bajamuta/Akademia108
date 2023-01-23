const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const Post = require("./models/PostModel");

// ONLY FOR DEVELOPMENT MODE
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/express-blog");

// we can add prefix to our path
// app.use('/test', express.static('public'));
app.use(express.static('public'));

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

app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Blog',
        content: 'Lorem ipsum blog test',
        displayTitle: true,
        names: ["Adam", "Jola", "Mariusz", "Agnieszka"]
    })
});

app.get('/mongoose/:id', (req, res) => {
    Post.findById(req.params.id).exec((err, post) => {
        console.log(post);
        if (err)
        {
            res.send('An error has occurred:' + err);
        }
        else
        {
            res.render("blog", {
                title: post.title,
                content: post.content,
                displayTitle: true,
                names: ["Tomasz", "Miłosz", "Kasia", "Monika"]
            });
        }
    });
});

app.listen(8080, () => console.log('Serwer Node.Js działa'));

// to run nodemon: npm start (need to configure) or npx nodemon PATH_TO/index.js
