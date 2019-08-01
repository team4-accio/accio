'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require all routes
const checkouts = require('./checkouts');
const items = require('./items');
const users = require('./users');

// Routes
router.use('/checkouts', checkouts);
router.use('/items', items);
router.use('/users', users);

module.exports = router;