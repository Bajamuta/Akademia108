const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.cookies ? req.cookies['AuthToken'] : null;
    try {
        if (token)
        {
            const decoded = jwt.decode(token, "secret");
            userController.user(decoded._id)
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
