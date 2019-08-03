'use strict';

// Dependencies
const path = require('path');
const router = require('express').Router(); // Create a Router instance

// Require all API routes
const api = require('./api');
const auth = require('./auth');

// API routes
router.use('/api', api);

// User authentication routes
router.use('/login', auth.login);
router.use('/logout', auth.logout);

// If no API routes are hit, send React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
