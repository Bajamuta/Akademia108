const express = require('express');
const router = express.Router();
const registerFormController = require('../controllers/registerFormController');
const homeController = require('../controllers/homeController');

module.exports = router;

router.get('/', homeController.home);

router.get('/register',
    registerFormController.form
);

router.post('/register', registerFormController.check,
    registerFormController.register);
