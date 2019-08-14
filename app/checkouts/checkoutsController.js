'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require Checkout model
const Checkout = require('./checkoutsModel');

// Require users helper modules
const users = { // Avoid cyclic dependency by requiring direct path to users attach module
    attach: require('../users/usersAttach').attach,
    detach: require('../users/usersAttach').detach,
    exists: require('../users/usersExists').exists
}

// Require users auth controller
const auth = require('../auth/auth');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /api/checkouts
router.route('/')
    // GET route for listing all checkouts sorted by id, with the most recent checkouts appearing first
    .get(function (req, res) {
        auth.authorize(req, res, function () {
            const query = utils.format.query(req.query);

            Checkout.find(query)
                .populate({ path: 'items', options: { sort: { _id: -1 } } })
                .sort({ _id: -1 })
                .then(function (checkout) {
                    res.status(200).json(checkout);
                })
                .catch(function (err) {
                    res.status(500).json(err);
                });
        });
    })
    // POST route for creating a checkout
    .post(function (req, res) {
        auth.authorize(req, res, function () {
            // Check if user exists before creating a checkout
            users.exists(req, res, function () {
                Checkout.create(req.body)
                    .then(function (checkout) {
                        let populateItems = true; // Enables items to populate in response

                        if (populateItems) {
                            Checkout.findById(checkout._id)
                                .populate({ path: 'items', options: { sort: { _id: -1 } } })
                                .then(function (dbCheckout) {
                                    res.status(200).json(dbCheckout);

                                    // Attach the checkout to a user
                                    return users.attach(
                                        { _id: dbCheckout.user },
                                        { checkouts: dbCheckout._id }
                                    );
                                })
                                .catch(function (err) {
                                    res.status(500).json(err);
                                });
                        } else {
                            res.status(200).json(checkout);

                            // Attach the checkout to a user
                            return users.attach(
                                { _id: checkout.user },
                                { checkouts: checkout._id }
                            );
                        }
                    })
                    .catch(function (err) {
                        res.status(500).json(err);
                    });
            });
        });
    });

// Matches with /api/checkouts/:_id
router.route('/:_id')
    // GET route for retrieving a checkout by id
    .get(function (req, res) {
        auth.authorize(req, res, function () {
            Checkout.findById(req.params._id)
                .populate({ path: 'items', options: { sort: { _id: -1 } } })
                .then(function (checkout) {
                    res.status(200).json(checkout);
                })
                .catch(function (err) {
                    res.status(500).json(err);
                });
        });
    })
    // PATCH route for updating a checkout by id
    .patch(function (req, res) {
        auth.authorize(req, res, function () {
            Checkout.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
                .populate({ path: 'items', options: { sort: { _id: -1 } } })
                .then(function (checkout) {
                    res.status(200).json(checkout);
                })
                .catch(function (err) {
                    res.status(500).json(err);
                });
        });
    })
    // DELETE route for deleting a checkout by id
    .delete(function (req, res) {
        auth.authorize(req, res, function () {
            Checkout.deleteOne({ _id: req.params._id })
                .then(function (checkout) {
                    res.status(200).json(checkout);

                    // Detach the checkout from a user
                    return users.detach(
                        { _id: checkout.user },
                        { checkouts: checkout._id }
                    );
                })
                .catch(function (err) {
                    res.status(500).json(err);
                });
        });
    });

module.exports = router;
