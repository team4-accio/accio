'use strict';

// Require User model
const User = require('../users/usersModel');

module.exports = {
    // Authenticate request
    authorize: function (req, res, cb) {
        User.findOne({ token: req.headers['authorization'] })
            .then(function (user) {
                if (user) {
                    cb();
                } else {
                    res.status(401).json({
                        error: {
                            code: 401,
                            message: 'Unauthorized request'
                        }
                    });
                }
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    }
};
