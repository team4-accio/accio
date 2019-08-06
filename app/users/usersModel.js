'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define User schema
const userSchema = new Schema({
    checkouts: [
        {
            ref: 'Checkout',
            type: Schema.Types.ObjectId
        }
    ],
    email: {
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/],
        required: true,
        trim: true,
        type: String,
        unique: true
    },
    name: {
        required: true,
        trim: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        enum: ['admin', 'user'],
        required: true,
        type: String
    },
    salt: {
        required: true,
        type: String
    },
    session: {
        default: null,
        type: String
    },
    status: {
        enum: ['active', 'inactive'],
        required: true,
        type: String
    }
}, { timestamps: true });

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
