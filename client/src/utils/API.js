import axios from 'axios';
import moment from 'moment';

export default {
    // USERS
    getAllUsers: () => {
        return axios.get('/api/users');
    },
    getFilteredUsers: (filter, query) => {
        return axios.request({
            method: 'GET',
            url: `/api/users`,
            params: {
                [filter]: query
            }
        });
    },

    // ITEMS
    getItems: () => {
        return axios.get("/api/items", {
            headers: {
                authorization: "86b89440-bb1d-11e9-8a28-0f10265f69af"
            }
        })
    },
    searchItems: (filter, query) => {
        return axios.get("/api/items", {
            headers: {
                authorization: "86b89440-bb1d-11e9-8a28-0f10265f69af"
            },
            params: {
                [filter]: query
            }
        })
    },
    addNewItem: (itemData) => {
        console.log(itemData);
        return axios.post(`/api/items`, itemData)
    },
    editItem: (itemID, field, value) => {
        return axios.patch("/api/items/" + itemID, { [field]: value }, {
            headers: {
                authorization: "86b89440-bb1d-11e9-8a28-0f10265f69af"
            }
        })
    },
    deleteItem: (itemID) => {
        return axios.delete("/api/items/" + itemID, {
            headers: {
                authorization: "86b89440-bb1d-11e9-8a28-0f10265f69af"
            }
        })
    },

    // CHECKOUTS
    getAllOverdue: () => {
        return axios.get('/api/checkouts', {
            headers: {
                authorization: '86b89440-bb1d-11e9-8a28-0f10265f69af'
            },
            params: {
                return: {
                    $lt: moment() // Today's datetime
                }
            }
        });
    },
    getAllPending: () => {
        return axios.get('/api/checkouts', {
            headers: {
                authorization: '86b89440-bb1d-11e9-8a28-0f10265f69af'
            },
            params: {
                status: 'pending'
            }
        });
    },

    // AUTH
    confirmPassword: (email, password) => {
        return axios.post("/api/auth/password", {
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
    },
    logout: () => {
        return axios.delete("/login", {
            headers: { "x-session-token": localStorage.getItem("sessionid") }
        })
    }

};
