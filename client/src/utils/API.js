import axios from 'axios';
import moment from 'moment';

export default {
    // USERS
    getAllUsers: session => {
        return axios.get('/api/users', {
            headers: {
                'x-session-token': session
            }
        });
    },
    getFilteredUsers: (filter, query, session) => {
        return axios.request(
            {
                method: 'GET',
                url: `/api/users`,
                params: {
                    [filter]: query
                }
            },
            {
                headers: {
                    'x-session-token': session
                }
            }
        );
    },

    // ITEMS
    getItems: session => {
        return axios.get('/api/items', {
            headers: {
                'x-session-token': session
            }
        });
    },
    searchItems: (filter, query, session) => {
        return axios.get('/api/items', {
            headers: {
                'x-session-token': session
            },
            params: {
                [filter]: query
            }
        });
    },
    addNewItem: (itemData, session) => {
        console.log(itemData);
        return axios.post(`/api/items`, itemData, {
            headers: {
                'x-session-token': session
            }
        });
    },
    editItem: (itemID, field, value, session) => {
        return axios.patch(
            '/api/items/' + itemID,
            { [field]: value },
            {
                headers: {
                    'x-session-token': session
                }
            }
        );
    },
    deleteItem: (itemID, session) => {
        return axios.delete('/api/items/' + itemID, {
            headers: {
                'x-session-token': session
            }
        });
    },

    // CHECKOUTS
    getAllOverdue: session => {
        return axios.get('/api/checkouts', {
            headers: {
                'x-session-token': session
            },
            params: {
                return: {
                    $lt: moment() // Today's datetime
                }
            }
        });
    },
    getAllPending: session => {
        return axios.get('/api/checkouts', {
            headers: {
                'x-session-token': session
            },
            params: {
                status: 'pending'
            }
        });
    },

    // AUTH
    confirmPassword: (email, password) => {
        return axios.post('/api/auth/password', {
            headers: {
                authorization: '86b89440-bb1d-11e9-8a28-0f10265f69af'
            },
            body: {
                email: email,
                password: password
            }
        });
    },
    // Retrieve session user from session token
    getSession: session => {
        return axios.get('/session', {
            headers: { 'x-session-token': session }
        });
    },
    login: user => {
        return axios.post(`/login`, user);
    }
};
