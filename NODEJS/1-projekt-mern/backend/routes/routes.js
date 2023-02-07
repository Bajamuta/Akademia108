const express = require('express');
const router = express.Router();
const registerFormController = require('../controllers/registerFormController');
const homeController = require('../controllers/homeController');
const customerController = require('../controllers/customerController');
const userController = require('../controllers/userController');
const authHelper = require('../lib/authHelper');

module.exports = router;

router.get('/', homeController.home);

router.get('/registerCustomer', registerFormController.customerForm);

router.post('/registerCustomer', registerFormController.checkCustomerForm,
    customerController.registerCustomer);

router.get('/registerCustomer/delete/:id', customerController.unregisterCustomer);

router.get('/registerCustomer/update/:id', registerFormController.updateCustomerForm);

router.post('/registerCustomer/update/:id', registerFormController.checkCustomerForm, customerController.update);

router.get('/user', userController.userForm);

router.post('/user', userController.checkUserForm, userController.addNewUser);

router.get('/user/login', userController.loginForm);

router.post('/user/login', userController.login);

router.get('/test', authHelper, homeController.home);
