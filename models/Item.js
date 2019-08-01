'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Item schema
const itemSchema = new Schema({
    available: {
        required: true,
        type: Boolean
    },
    category: {
        enum: ['Laptop - Mac', 'Laptop - PC', 'iPad', 'keyboard', 'mouse'],
        required: true,
        type: String
    },
    condition: {
        enum: ['new', 'good', 'okay', 'bad'],
        required: true,
        type: String
    },
    description: {
        default: null,
        trim: true,
        type: String
    },
    name: {
        required: true,
        trim: true,
        type: String
    },
    sn: {
        required: true,
        trim: true,
        type: String,
        unique: true
    },
    tags: [
        {
            trim: true,
            type: String
        }
    ]
}, { timestamps: true });

// Filters duplicate tags
itemSchema.methods.filterTags = function () {
    this.tags = this.tags.filter(
        (tag, index, tags) => tags.indexOf(tag) === index
    );

    return this.tags;
};

// Create Item model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
