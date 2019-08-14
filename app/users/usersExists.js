'use strict';

const User = require('./usersModel');

module.exports = {
    // Check if user exists
    exists: function (req, res, cb) {
        User.findById(req.body.user)
            .then(function (user) {
                if (user === null) {
                    res.status(404).json({
                        error: {
                            code: 404,
                            message: 'User not found: ' + req.body.user
                        }
                    });
                } else {
                    cb();
                }
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    }
};
