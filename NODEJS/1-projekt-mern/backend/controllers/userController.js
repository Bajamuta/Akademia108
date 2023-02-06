const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

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
    login: (body, res) => {
        // console.log('query', query);
        return User.findOne({username: body.username})
            .then(
                (user) => {
                    if (user)
                    {
                        bcrypt.compare(body.password, user.password, (err, logged) => {
                           if (logged)
                           {
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
