'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashpass');

// Require User model
const User = require('../users/usersModel');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /validate
router
    .route('/')
    // POST route to log in a user
    .post(function(req, res) {
        User.findOne({ email: req.body.email })
            .populate({ path: 'checkouts', options: { sort: { _id: -1 } } })
            .then(function(user) {
                if (user === null) {
                    res.status(404).json({
                        error: {
                            code: 404,
                            message: 'No such user: ' + req.body.user
                        }
                    });
                } else {
                    const attempt = hashPass(req.body.password, user.salt);
                    if (attempt.hash === user.password) {
                        res.status(200).json(utils.format.usersResponse(user));
                    } else {
                        res.status(401).json({
                            error: {
                                code: 401,
                                message: 'Bad credentials'
                            }
                        });
                    }
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
