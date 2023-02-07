const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const {validationResult, check} = require("express-validator");

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
    userForm: (req, res) => {
        res.render('user', {
            title: 'User create',
            content: 'Please fill the customerForm below',
            action: '/user',
            button: "Submit",
            request: {},
            errors: []
        })
    },
    checkUserForm: [
        check('username')
            .trim()
            .isLength({min: 3, max: 50})
            .withMessage('Must contain between 3 and 50 characters'),
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
    addNewUser: async (req, res) => {
        const errors = validationResult(req);
        let user;
        if (!errors.isEmpty())
        {
            res.render('user', {
                title: 'User create',
                content: 'The customerForm contains errors!',
                action: '/user',
                button: "Submit",
                request: req,
                errors: errors
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
                        res.render('user', {
                            title: 'User create',
                            content: 'An error has occurred...',
                            action: '/user',
                            button: "Submit",
                            request: req,
                            errors: errors
                        });
                    }
                )
                .finally(
                    () => {
                        // res.redirect('/');
                    }
                )
        }
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
        // console.log('query', query);
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
            console.log('sprawdz', req.body);
            return User.findOne({username: req.body.username})
                .then(
                    (user) => {
                        if (user) {
                            bcrypt.compare(req.body.password, user.password, (err, logged) => {
                                if (logged) {
                                    const token = user.generateAuthToken(user);
                                    if (token) {
                                        res.cookie('AuthToken', token);
                                        res.render('logged', {
                                            title: "Logged in",
                                            content: "You have been successfully logged in"
                                        });
                                    }
                                }
                            });
                        }
                        return user;
                    }
                )
                .catch((err) => console.log('err', err))
        }
    }
}
