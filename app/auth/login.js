'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashpass');
const uuidv1 = require('uuid/v1');

// Require users auth controller
const auth = require('./auth');

// Require User model
const User = require('../users/usersModel');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /login
router.route('/')
    // POST route to log in a user
    .post(function (req, res) {
        auth.authorize(req, res, function () {
            User.findOne({ email: req.body.email })
                .then(function (user) {
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
                            const uuid = uuidv1();

                            User.findOneAndUpdate({ email: user.email }, { session: uuid }, { new: true })
                                .populate({ path: 'checkouts', options: { sort: { _id: -1 } } })
                                .then(function (dbUser) {
                                    res.status(200)
                                        .header('x-session-token', dbUser.session)
                                        .json(utils.format.usersResponse(dbUser));
                                })
                                .catch(function (err) {
                                    res.status(500).json(err);
                                });
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
                .catch(function (err) {
                    res.status(500).json(err);
                });
        });
    })
    // DELETE route to log out a user
    .delete(function (req, res) {
        auth.authorize(req, res, function () {
            User.findOneAndUpdate({ session: req.headers['x-session-token'] }, { session: null }, { new: true })
                .then(function (user) {
                    res.status(200).json({ message: `User: ${user.email} logged out successfully` });
                })
                .catch(function (err) {
                    res.status(500).json(err);
                });
        });
    });

module.exports = router;
