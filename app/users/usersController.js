'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashPass');

// Require User model
const User = require('./usersModel');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /api/users
router.route('/')
    // GET route for listing all users sorted by id, with the most recent users appearing first
    .get(function (req, res) {
        const query = utils.format.query(req.query);
        User.find(query)
            .populate({
                path: 'checkouts',
                populate: { path: 'items' },
                options: { sort: { _id: -1 } }
            })
            .sort({ _id: -1 })
            .then(function (users) {
                res.status(200).json(
                    users.map(user => utils.format.usersResponse(user))
                );
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a user
    .post(function (req, res) {
        if (req.body.password !== req.body.passwordConfirm) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: 'Passwords do not match'
                }
            });
        } else {
            const password = hashPass(req.body.password);
            const request = {
                email: req.body.email,
                name: req.body.name,
                password: password.hash,
                role: req.body.role,
                salt: password.salt,
                status: req.body.status
            };

            User.create(request)
                .then(function (user) {
                    res.status(200).json(utils.format.usersResponse(user));
                })
                .catch(function (err) {
                    res.status(500).json(err);
                });
        }
    });

// Matches with /api/users/:_id
router.route('/:_id')
    // GET route for retrieving a user by id
    .get(function (req, res) {
        User.findById(req.params._id)
            .populate({
                path: 'checkouts',
                populate: { path: 'items' },
                options: { sort: { _id: -1 } }
            })
            .then(function (user) {
                res.status(200).json(utils.format.usersResponse(user));
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating a user by id
    .patch(function (req, res) {
        User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            .populate({
                path: 'checkouts',
                populate: { path: 'items' },
                options: { sort: { _id: -1 } }
            })
            .then(function (user) {
                res.status(200).json(utils.format.usersResponse(user));
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // DELETE route for deleting a user by id
    .delete(function (req, res) {
        User.deleteOne({ _id: req.params._id })
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
