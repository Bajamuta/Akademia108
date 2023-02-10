const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const eventController = require('../controllers/eventController');
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
* USERS
* */
router.get('/api/user/all', userController.index);
router.get('/api/user/:id', userController.user);
/*show users for that specified event, for all cities*/
router.get('/api/user/event/:eventId', userController.index);
/*show users for all events but in specified city*/
router.get('/api/user/city/:cityId', userController.index);
/*show users for specified event, for specified city*/
/*TODO how exactly it should be done? city is inside event*/
router.get('/api/user/event/:eventId/city/:cityId', userController.index);
router.post('/api/user/add', userController.create);
router.post('/api/user/update/:id', userController.update);
router.delete('/api/user/delete/:id', userController.delete);

/*
* AUTH
* */
router.post('/auth/login', authController.getToken) /*MUSI ODESŁAĆ JSON*/
/*TODO API CONTROLLERS*/
