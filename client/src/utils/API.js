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
        console.log(filter, query)
        return axios.request(
            {
                method: 'GET',
                url: `/api/users`,
                params: {
                    [filter]: query
                },
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
                status: "approved",
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
    confirmPassword: (email, password, session) => {
        console.log(email, password, session)
        return axios.post('/password', {
            headers: { 'x-session-token': session },
            email: email,
            password: password
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
    },
    logout: () => {
        return axios.delete("/login", {
            headers: { "x-session-token": localStorage.getItem("sessionid") }
        })
    }

};
