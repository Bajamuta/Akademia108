const customerController = require('./customerController');
const eventController = require('./eventController');
const cityController = require('./cityController');
const userController = require('./userController');
const {check, validationResult} = require("express-validator");

module.exports = {
    home: (req, res) => {
        let customers;
        customerController.index(req, res)
            .then(
                (result) => {
                    customers = result;
                    customers.map(
                        async (cust) => {
                            cust.event = await eventController.event({params: {id: cust.eventId}}, res);
                            cust.city = await cityController.city({params: {id: cust.cityId}}, res);
                        }
                    )
                    res.render('home', {
                        title: 'Home',
                        content: 'Welcome',
                        customers: customers
                    })
                }
            )
            .catch(
                (err) => console.error(err)
            )
    },
    unregister: (req, res) => {
        customerController.remove(req, res)
            .then(
                (result) => {
                    res.redirect('/')
                }
            )
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
    /*TODO przenieść do userController*/
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
        else
        {
            console.log('sprawdz', req.body);
            userController.login(req.body, res)
                .then(
                    (result) =>
                    {
                        // console.log('result', result);
                        /*res.render('logged', {
                            title: "Logged in",
                            content: "You have been successfully logged in"
                        });*/
                        return result;
                    }
                )
                .catch(
                    (err) => {
                        res.render('logged', {
                            title: 'Error',
                            content: 'There was a problem with loggin in'
                        })
                    }
                )
        }
    }
}
