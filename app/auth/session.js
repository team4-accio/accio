'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require User model
const User = require('../users/usersModel');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /session
router
    .route('/')
    // GET route to retrieve session user with token header
    .get(function(req, res) {
        if (req.headers['x-session-token']) {
            User.findOne({ session: req.headers['x-session-token'] })
                .populate({
                    path: 'checkouts',
                    populate: { path: 'items' },
                    options: { sort: { _id: -1 } }
                })
                .then(function(user) {
                    if (user) {
                        res.status(200).json(utils.format.usersResponse(user));
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
        } else {
            res.status(401).json({
                error: {
                    code: 401,
                    message: 'Unauthorized request'
                }
            });
        }
    });

module.exports = router;
