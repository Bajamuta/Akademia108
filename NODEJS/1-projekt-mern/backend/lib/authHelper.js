const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");
module.exports = (req, res, next) => {
    console.log("TUTAJ", req.cookies);
    try {
        const token = req.cookies ? req.cookies['AuthToken'] : null;
        if (token)
        {
            const decoded = jwt.decode(token, "abc123");
            console.log('DECODED', decoded);
            User.findById(decoded._id)
                .lean()
                .then(
                    (user) => {
                        res.locals.userId = decoded._id;
                        res.locals.username = user.username;
                        next();
                    }
                )
                .catch(
                    (err) => {
                        console.error('An error has occurred:', err);
                        res.redirect('/');
                    }
                );
            /*userController.user(decoded._id)
                .then(
                    (user) => {
                        res.locals.userId = decoded._id;
                        res.locals.username = user.username;
                    }
                )
                .catch(
                    (err) => {
                        console.error('An error has occurred:', err);
                        res.redirect('/');
                    }
                );*/
        }
        else
        {
            res.redirect('/user/login?loginRedirect=true');
        }
    }
    catch (e) {
        console.error('An error has occurred', e);
        res.redirect('/');
    }
}
