'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require Item model
const Item = require('./itemsModel');

// Require users auth controller
const auth = require('../auth/auth');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /api/items
router
    .route('/')
    // GET route for listing all items sorted by id, with the most recent items appearing first
    .get(auth.authenticate, function(req, res) {
        const query = utils.format.query(req.query);
        Item.find(query)
            .sort({ _id: -1 })
            .then(function(item) {
                res.status(200).json(item);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating an item
    .post(auth.authenticate, function(req, res) {
        const item = new Item(req.body);
        if (req.body.tags) {
            item.filterTags();
        }

        Item.create(item)
            .then(function(dbItem) {
                res.status(200).json(dbItem);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    });

// Matches with /api/items/:_id
router
    .route('/:_id')
    // GET route for retrieving an item by id
    .get(auth.authenticate, function(req, res) {
        Item.findById(req.params._id)
            .then(function(item) {
                res.status(200).json(item);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating an item by id
    .patch(auth.authenticate, function(req, res) {
        if (req.body.tags) {
            const item = new Item(req.body);
            req.body.tags = item.filterTags(); // Only pass updated tags to avoid creating new _id
        }

        Item.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            .then(function(dbItem) {
                res.status(200).json(dbItem);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    })
    // DELETE route for deleting an item by id
    .delete(auth.authenticate, function(req, res) {
        Item.deleteOne({ _id: req.params._id })
            .then(function(item) {
                res.status(200).json(item);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
