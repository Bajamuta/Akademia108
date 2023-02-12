const User = require('../models/UserModel');
const Registration = require('../models/RegistrationModel');
const City = require('../models/CityModel');
const Event = require('../models/EventModel');
const bcrypt = require('bcrypt');
const {validationResult, check} = require("express-validator");
const cityController = require("./cityController");
const eventController = require("./eventController");
const registrationController = require('./registrationController');

module.exports = {
    index: (req, res) => {
        return User.find()
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('err', err))
    },
    user: (req, res) => {
        return User.findById(req.params.id)
            .populate("registrations")
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('err', err))
    },
    create: (req, res) => {
      let newUser = new User({...req.body});
      return newUser.save();
    },
    update: (req, res) => {
        return User.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('err', err))
    },
    delete: (req, res) => {
        return User.findByIdAndDelete(req.params.id)
            .lean()
            .then(
                (result) => {
                    return result;
                }
            )
            .catch((err) => console.log('err', err))
    },
    userForm: async (req, res) => {
        let user = {};
        if (res.locals.userId)
        {
            user = await User.findById(res.locals.userId).populate("registrations");
        }
        console.log('form user', user);
        res.render('signUp', {
            title: 'User create',
            content: 'Please fill the form below',
            action: '/user/signup',
            button: "Submit",
            request: {},
            errors: [],
            user: user
        });
    },
    checkUserForm: [
        check('username')
            .trim()
            .isLength({min: 3, max: 50})
            .withMessage('Must contain between 3 and 50 characters'),
        check('name')
            .trim()
            .isLength({min: 3, max: 50})
            .withMessage('Must contain between 3 and 50 characters'),
        check('surname')
            .trim()
            .isLength({min: 2, max: 100})
            .withMessage('Must contain between 2 and 100 characters'),
        check('email')
            .trim()
            .isEmail()
            .withMessage('Must be an valid email address'),
        check('password')
            .trim()
            .isLength({min: 10, max: 100})
            .withMessage('Must contain between 10 and 100 characters'),
        check('password')
            .isStrongPassword()
            .withMessage('Must be a strong password')
    ],
    userFormErrors: async (req, res) => {
        const errors = validationResult(req);
        let user = {};
        if (res.locals.userId)
        {
            user = await User.findById(res.locals.userId).populate("registrations");
        }
        if (!errors.isEmpty())
        {
            res.render('signUp', {
                title: user ? 'User update' : 'User create',
                content: 'The form contains errors!',
                action: user ? '/user/update' : '/user/signup',
                button: "Submit",
                request: req,
                errors: errors,
                user: user
            });
        }
        else
        {
            let newUser = new User({...req.body});
            newUser
                .save()
                .then(
                    (result) => {
                        user = result;
                        res.redirect('/');
                    }
                )
                .catch(
                    (err) => {
                        console.error('An error has occurred', err);
                        res.render('signUp', {
                            title: user ? 'User update' : 'User create',
                            content: 'An error has occurred...',
                            action: user ? '/user/update' : '/user/signup',
                            button: "Submit",
                            request: req,
                            errors: errors,
                            user: user
                        });
                    }
                )
                .finally(
                    () => {
                        res.redirect('/');
                    }
                )
        }
    },
    chooseEventForm: (req, res) => {
        let events;
        let cities;
        cityController.index(req, res)
            .then(
                (result) => {
                    cities = result;
                    return eventController.index(req, res);
                }
            )
            .then(
                (result) => {
                    events = result;
                }
            )
            .finally(
                () => {
                    res.render('chooseEvent', {
                        title: 'Register for an event',
                        content: 'Please fill the form below',
                        action: '/user/event/add',
                        events: events,
                        cities: cities,
                        button: "Submit",
                        request: {},
                        errors: []
                    });
                }
            );
    },
    addEvent: (req, res) => {
        const errors = validationResult(req);
        let events;
        let cities;
        if (!errors.isEmpty())
        {
            cityController.index(req, res)
                .then(
                    (citiesResult) => {
                        cities = citiesResult;
                        return eventController.index(req, res);
                    }
                )
                .then(
                    (eventsResult) => {
                        events = eventsResult;
                    }
                )
                .finally(
                    () => {
                        res.render('chooseEvent', {
                            title: 'Register for an event',
                            content: 'The form contains errors!',
                            action: '/user/event/add',
                            events: events,
                            cities: cities,
                            button: 'Submit',
                            request: req,
                            errors: errors
                        });
                    }
                );
        }
        else {
            let user;
            User.findById(res.locals.userId)
                .then(
                    (userResult) => {
                        user = userResult;
                        const params = {userId: res.locals.userId, cityId: req.body.cityId, eventId: req.body.eventId};
                        return registrationController.create({params: params});
                    }
                )
                .then(
                    (registrationResult) => {
                        user.registrations.push(registrationResult._id);
                        user.save();
                    }
                )
                .catch((err) => console.error('err', err))
                .finally(
                    () => {
                        res.redirect('/user/profile');
                    }
                )
        }
    },
    deleteEvent: (req, res) => {
        Registration.findByIdAndDelete(req.params.id)
            .then(
                (result) => {
                    User.findById(res.locals.userId)
                        .then(
                            (user) => {
                                /*TODO remove registration*/
                                const reg = user.registrations.find((r) => r)
                                user.registrations.remove()
                            }
                        )
                    res.redirect('/')
                }
            )
            .catch((err) => console.log('error', err))
    },
    loginForm: (req, res) => {
        res.render('loginUser', {
            title: 'Login',
            content: 'Enter your credentials to log in',
            action: '/user/login',
            button: 'Login',
            request: req,
            errors: []
        });
    },
    login: (req, res) => {
        const errors = validationResult(req);
        if (req.query.loginRedirect)
        {
            res.render('loginUser', {
                title: 'Login',
                content: 'Please log in to use app',
                action: '/user/login',
                button: 'Login',
                request: req,
                errors: []
            });
        }
        else if (!errors.isEmpty())
        {
            res.render('loginUser', {
                title: 'Login',
                content: 'Enter your credentials to log in',
                action: '/user/login',
                button: 'Login',
                request: req,
                errors: errors
            });
        }
        else {
            return User.findOne({username: req.body.username})
                .then(
                    (user) => {
                        if (user) {
                            bcrypt.compare(req.body.password, user.password, (err, logged) => {
                                if (logged) {
                                    const token = user.generateAuthToken(user);
                                    if (token) {
                                        res.cookie('AuthToken', token);
                                        res.redirect('/user/profile');
                                    }
                                }
                                else
                                {
                                    res.render('home', {
                                        title: 'Home',
                                        content: 'Wrong credentials'
                                    });
                                }
                            });
                        }
                        return user;
                    }
                )
                .catch((err) => console.log('err', err))
        }
    },
    userProfile: async (req, res) => {
        const user = await User.findById(res.locals.userId).populate("registrations").lean();
        console.log('user', user);
        res.render('userProfile', {
            title: 'User Profile',
            content: 'Check your details',
            user: user
        });
    }
}
