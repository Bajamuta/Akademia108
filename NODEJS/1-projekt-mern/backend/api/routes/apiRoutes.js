const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const eventController = require('../controllers/eventController');
const customerController = require('../controllers/customerController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = router;

// router.get('/api/registerCustomer', )

/*
* CITIES
* */
router.get('/api/city/all', cityController.index);
router.get('/api/city/:id', cityController.city);
router.post('/api/city/add', cityController.create);
router.post('/api/city/update/:id', cityController.update);
router.delete('/api/city/delete/:id', cityController.delete);


/*
* EVENTS
* */
router.get('/api/event/all', eventController.index);
router.get('/api/event/:id', eventController.event);
router.post('/api/event/add', eventController.create);
router.post('/api/event/update/:id', eventController.update);
router.delete('/api/event/delete/:id', eventController.delete);

/*
* CUSTOMERS (registrations)
* */
router.get('/api/customer/all', customerController.index);
router.get('/api/customer/:id', customerController.customer);
router.get('/api/customer/event/:eventId', customerController.index);
router.get('/api/customer/city/:cityId', customerController.index);
router.get('/api/customer/event/:eventId/city/:cityId', customerController.index);
router.post('/api/customer/add', customerController.create);
router.post('/api/customer/update/:id', customerController.update);
router.delete('/api/customer/delete/:id', customerController.delete);

/*
* USERS
* */
router.get('/api/user/all', userController.index);
router.get('/api/user/:id', userController.user);
router.get('/api/user/add', userController.create);
router.get('/api/user/update/:id', userController.update);
router.get('/api/user/delete/:id', userController.delete);

/*
* AUTH
* */
// api login + api
router.get('/auth', authController.index) /*MUSI ODESŁAĆ JSON*/
