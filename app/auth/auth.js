'use strict';

// Require User model
const User = require('../users/usersModel');

module.exports = {
    // Authenticate request
    authenticate: function(req, res, next) {
        User.findOne({ session: req.headers['x-session-token'] })
            .then(function(user) {
                if (user) {
                    next();
                } else {
                    res.status(401).json({
                        error: {
                            code: 401,
                            message: 'Unauthorized request'
                        }
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
};
