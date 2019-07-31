'use strict'

// Require and configure dotenv
require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');

// App configuration
const accio = require('./config');

// Initialize Express
const app = express();

// Define port
const PORT = process.env.PORT || 3001;

// Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from React app
app.use(express.static('client/build'));

// Connect to MongoDB
mongoose.connect(accio.config.mongodb.uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
});

// Start server
app.listen(PORT);
