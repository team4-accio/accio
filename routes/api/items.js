'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require all models
const db = require('../../models');

// Routes
// Matches with /api/items
router.route('/')
    // GET route for listing all items sorted by id, with the most recent items appearing first
    .get(function (req, res) {
        db.Item.find(req.body)
            .sort({ _id: -1 })
            .then(function (item) {
                res.status(200).json(item);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating an item
    .post(function (req, res) {
        const Item = db.Item;
        const item = new Item(req.body);
        item.filterTags();

        db.Item.create(item)
            .then(function (dbItem) {
                res.status(200).json(dbItem);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

// Matches with /api/items/:_id
router.route('/:_id')
    // GET route for retrieving an item by id
    .get(function (req, res) {
        db.Item.findById(req.params._id)
            .then(function (item) {
                res.status(200).json(item);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating an item by id
    .patch(function (req, res) {
        const Item = db.Item;
        const item = new Item(req.body);

        req.body.tags = item.filterTags(); // Only pass updated tags to avoid creating new _id

        db.Item.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            .then(function (dbItem) {
                res.status(200).json(dbItem);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // DELETE route for deleting an item by id
    .delete(function (req, res) {
        db.Item.deleteOne({ _id: req.params._id })
            .then(function (item) {
                res.status(200).json(item);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
