'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require all models
const db = require('../../models');

// Routes
// Matches with /logout
router.route('/')
    // POST route to log out a user
    .post(function (req, res) {
        db.User.findOneAndUpdate({ session: req.headers['x-session-token'] }, { session: null }, { new: true })
            .then(function (user) {
                res.status(200).json({ message: `User: ${user.email} logged out successfully` });
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
