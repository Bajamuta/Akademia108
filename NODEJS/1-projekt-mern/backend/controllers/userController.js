const User = require('../models/UserModel');

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
    }
}
