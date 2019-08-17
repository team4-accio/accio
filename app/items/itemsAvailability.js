'use strict';

const Item = require('./itemsModel');

module.exports = {
    // Makes an item available after checking in
    makeAvailable: function (items, cb) {
        Item.updateMany(items, { available: true })
            .then(function (dbItems) {
                return cb();
            });
    },
    // Makes an item unavailable after checking out
    makeUnavailable: function (items, cb) {
        Item.updateMany(items, { available: false })
            .then(function () {
                return cb();
            });
    }
};
