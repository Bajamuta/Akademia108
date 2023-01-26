const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        content: 'Welcome'
    });
});

router.get('/register',
    /*{
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

    }*/(req, res) => {
    res.render('register', {
        title: 'Registration',
        content: 'Test',
        events: ['test'],
        cities: ['city']
    })}
);
