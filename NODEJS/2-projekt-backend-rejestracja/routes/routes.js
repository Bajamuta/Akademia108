const express = require('express');
const router = express.Router();
const registerFormController = require('../controllers/registerFormController');

module.exports = router;

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        content: 'Welcome'
    });
});

router.get('/register',
    registerFormController.home
);

router.post('/register')
