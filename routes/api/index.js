'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require all routes
const users = require('./users');

// Routes
router.use('/users', users);

module.exports = router;
