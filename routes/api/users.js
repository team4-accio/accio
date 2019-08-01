'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require all models
const db = require('../../models');

// Routes
// Matches with /api/users
router.route('/')
    // GET route for listing all users sorted by id, with the most recent users appearing first
    .get(function (req, res) {
        db.User.find(req.body)
            .populate({ path: 'checkouts', options: { sort: { _id: -1 } } })
            .sort({ _id: -1 })
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a user
    .post(function (req, res) {
        db.User.create(req.body)
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

// Matches with /api/users/:_id
router.route('/:_id')
    // GET route for retrieving a user by id
    .get(function (req, res) {
        db.User.findById(req.params._id)
            .populate({ path: 'checkouts', options: { sort: { _id: -1 } } })
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating a user by id
    .patch(function (req, res) {
        db.User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            .populate({ path: 'checkouts', options: { sort: { _id: -1 } } })
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // DELETE route for deleting a user by id
    .delete(function (req, res) {
        db.User.deleteOne({ _id: req.params._id })
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
