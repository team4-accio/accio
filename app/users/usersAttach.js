'use strict';

const User = require('./usersModel');

module.exports = {
    // Attach an object to a user
    attach: function (user, obj) {
        return User.findOneAndUpdate(user, { $push: obj });
    },
    // Detach an object from a user
    detach: function (user, obj) {
        return User.findOneAndUpdate(user, { $pull: obj });
    }
};
