'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const checkoutSchema = new Schema(
    {
        items: [
            {
                ref: 'Item',
                type: Schema.Types.ObjectId
            }
        ],
        out: {
            required: true,
            type: Date
        },
        return: {
            required: true,
            type: Date
        },
        status: {
            enum: ['approved', 'closed', 'pending', 'rejected'],
            lowercase: true,
            required: true,
            trim: true,
            type: String
        },
        user: {
            immutable: true,
            index: true,
            required: true,
            trim: true,
            type: String
        }
    },
    { timestamps: true }
);

// Create Checkout model
const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
