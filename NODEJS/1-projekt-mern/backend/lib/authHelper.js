const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");

function redirectLogin (req, res, next){
    /*
        console.log("TUTAJ", req.cookies);
    */
    try {
        const token = req.cookies ? req.cookies['AuthToken'] : null;
        if (token)
        {
            const decoded = jwt.decode(token, "abc123");
            /*            console.log('DECODED', decoded);*/
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

function isUserLoggedIn (req, res, next){
    try {
        const token = req.cookies ? req.cookies['AuthToken'] : null;
        if (token)
        {
            const decoded = jwt.decode(token, "abc123");
            /*            console.log('DECODED', decoded);*/
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
        }
    }
    catch (e) {
        console.error('An error has occurred', e);
        res.redirect('/');
    }
}

module.exports = {
    redirectLogin,
    isUserLoggedIn
}
