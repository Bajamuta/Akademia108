const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authHelper = require('../lib/authHelper');

module.exports = router;

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        content: 'Welcome to our page'
    });
})

router.get('/user/profile', authHelper, userController.userProfile);

router.get('/user/update', authHelper, userController.checkUserForm, userController.update);

router.post('/user/update', authHelper, userController.update);

router.get('/user/event/add', authHelper, userController.chooseEventForm);

router.post('/user/event/add', authHelper, userController.addEvent);

router.get('/user/event/delete', authHelper, userController.deleteEvent);

router.get('/user/signup', userController.userForm);

router.post('/user/signup', userController.checkUserForm, userController.userFormErrors);

router.get('/user/login', userController.loginForm);

router.post('/user/login', userController.login);
