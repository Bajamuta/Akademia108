const express = require('express');
const router = express.Router();
const registerFormController = require('../controllers/registerFormController');
const homeController = require('../controllers/homeController');
const authHelper = require('../lib/authHelper');

module.exports = router;

router.get('/', homeController.home);

router.get('/register', registerFormController.form);

router.post('/register', registerFormController.check,
    registerFormController.register);

router.get('/register/delete/:id', homeController.unregister);

router.get('/register/update/:id', registerFormController.updateForm);

router.post('/register/update/:id', registerFormController.check, registerFormController.update);

router.get('/user', registerFormController.userForm);

router.post('/user', registerFormController.checkUserForm, registerFormController.createUser);

router.get('/user/login', homeController.loginForm);

router.post('/user/login', homeController.login);

router.get('/test', authHelper, homeController.home);
