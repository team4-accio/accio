'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require all API routes
const api = require('./api');

// API Routes
router.use('/api', api);

module.exports = router;
