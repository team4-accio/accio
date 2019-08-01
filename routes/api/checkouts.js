'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require all models
const db = require('../../models');

// Routes
// Matches with /api/checkouts
router.route('/')
    // GET route for listing all checkouts sorted by id, with the most recent checkouts appearing first
    .get(function (req, res) {
        db.Checkout.find(req.body)
            .populate({ path: 'items', options: { sort: { _id: -1 } } })
            .sort({ _id: -1 })
            .then(function (checkout) {
                res.status(200).json(checkout);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a checkout
    .post(function (req, res) {
        // Check if user exists before creating a checkout
        db.User.findById(req.body.user)
            .then(function (user) {
                if (user === null) {
                    res.status(404).json({
                        error: {
                            code: 404,
                            message: 'No such user: ' + req.body.user
                        }
                    });
                } else {
                    db.Checkout.create(req.body)
                        .then(function (checkout) {
                            res.status(200).json(checkout);

                            // Update a user with the new checkout
                            return db.User.findOneAndUpdate(
                                { _id: user._id },
                                { $push: { checkouts: checkout._id } });
                        })
                        .catch(function (err) {
                            res.status(500).json(err);
                        });
                }
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

// Matches with /api/checkouts/:_id
router.route('/:_id')
    // GET route for retrieving a checkout by id
    .get(function (req, res) {
        db.Checkout.findById(req.params._id)
            .populate({ path: 'items', options: { sort: { _id: -1 } } })
            .then(function (checkout) {
                res.status(200).json(checkout);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating a checkout by id
    .patch(function (req, res) {
        db.Checkout.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            .populate({ path: 'items', options: { sort: { _id: -1 } } })
            .then(function (checkout) {
                res.status(200).json(checkout);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // DELETE route for deleting a checkout by id
    .delete(function (req, res) {
        db.Checkout.deleteOne({ _id: req.params._id })
            .then(function (checkout) {
                res.status(200).json(checkout);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
