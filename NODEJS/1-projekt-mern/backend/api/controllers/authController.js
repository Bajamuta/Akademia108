const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
module.exports = {
    getToken: (req, res) => {
        User.findOne({username: req.body.username})
            .lean()
            .then((user) => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, (err, logged) => {
                        if (logged) {
                            const token = user.generateAuthToken(user);
                            if (token) {
                                res.json({token: token});
                            }
                        }
                    });
                }
                /*res.json(user)*/
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
}
