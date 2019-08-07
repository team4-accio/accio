'use strict';

module.exports = {
    usersResponse: function (res) {
        return {
            _id: res._id,
            checkouts: res.checkouts,
            createdAt: res.createdAt,
            email: res.email,
            name: res.name,
            role: res.role,
            status: res.status,
            updatedAt: res.updatedAt
        };
    }
};
