'use strict';

module.exports = {
    usersResponse: function(res) {
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
    },
    query: function(query) {
        const keys = Object.keys(query);
        keys.forEach(key => {
            if (
                key === 'createdAt' ||
                key === 'updatedAt' ||
                key === 'out' ||
                key === 'return'
            ) {
                query[key] = JSON.parse(query[key]);
            }
        });

        return query;
    }
};
