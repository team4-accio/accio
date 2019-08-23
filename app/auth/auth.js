'use strict';

// Require User model
const User = require('../users/usersModel');

// @TODO turn roles into a collection
const roles = [
    {
        name: 'admin',
        privileges: [
            {
                actions: ['create', 'delete', 'list', 'retrieve', 'update'],
                resource: 'users',
                scope: 'unlimited'
            },
            {
                actions: ['create', 'delete', 'list', 'retrieve', 'update'],
                resource: 'checkouts',
                scope: 'unlimited'
            },
            {
                actions: ['create', 'delete', 'list', 'retrieve', 'update'],
                resource: 'items',
                scope: 'unlimited'
            }
        ]
    },
    {
        name: 'user',
        privileges: [
            {
                actions: ['create', 'delete', 'list', 'retrieve', 'update'],
                resource: 'checkouts',
                scope: 'limited'
            }
        ]
    }
];

// Authenticate request
const authenticate = function(req, res, next) {
    User.findOne({ session: req.headers['x-session-token'] })
        .then(function(user) {
            if (user) {
                const requiredPrivileges = getRequiredPrivileges(
                    req.method,
                    req.baseUrl.split('/'), // When base URL is split, the first index is ''
                    req.originalUrl.split('/') // Original URL contains id parameter and querystring
                );
                const userPrivileges = getUserPrivileges(
                    requiredPrivileges.resource,
                    user.role
                );

                // Checklist:
                // Does the user have access to the resource?
                // Can the user perform request (action) on the resource?
                // Does the user have access to all documents or just ones they own?
                if (
                    Object.keys(userPrivileges).length >= 0 && // User has access to the resource
                    userPrivileges.actions.includes(
                        requiredPrivileges.action
                    ) && // User can perform action on resource
                    (userPrivileges.scope === 'unlimited' || // User can access all documents
                        (user._id == req.query.user || // Request is made on user owned object
                            user._id == req.body.user))
                ) {
                    next();
                } else {
                    res.status(401).json({
                        error: {
                            code: 401,
                            message: 'Unauthorized request'
                        }
                    });
                }
            } else {
                res.status(401).json({
                    error: {
                        code: 401,
                        message: 'Unauthorized request'
                    }
                });
            }
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
};

// Retrieve the user's privileges for a specific resource
const getUserPrivileges = function(resource, userRole) {
    const userPrivileges = {};

    // @TODO find one role by role name
    roles.some(role => {
        if (role.name === userRole) {
            role.privileges.some(privileges => {
                if (privileges.resource === resource) {
                    userPrivileges.actions = privileges.actions;
                    userPrivileges.resource = privileges.resource;
                    userPrivileges.scope = privileges.scope;

                    return true;
                } else {
                    return false;
                }
            });

            return true;
        } else {
            return false;
        }
    });

    return userPrivileges;
};

// Fetch the action and resource needed to authorize the request
const getRequiredPrivileges = function(method, baseUrl, originalUrl) {
    const privilege = { resource: baseUrl[2] };

    switch (method) {
        case 'GET':
            if (originalUrl[3]) {
                privilege.action = 'retrieve';
            } else {
                privilege.action = 'list';
            }

            break;
        case 'PATCH':
            privilege.action = 'update';
            break;
        case 'POST':
            privilege.action = 'create';
            break;
        case 'DELETE':
            privilege.action = 'delete';
            break;
        default:
            privilege.action = '';
    }

    return privilege;
};

module.exports = {
    authenticate: authenticate
};
