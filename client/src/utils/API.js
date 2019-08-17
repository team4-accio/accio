import axios from "axios"
import moment from "moment"



export default {
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
    addNewItem: (itemData) => {
        console.log(itemData)
        return axios.post(`/api/items`, itemData)
    },
    getAllOverdue: () => {
        return axios.get("/api/checkouts", {
            headers: {
                authorization: "86b89440-bb1d-11e9-8a28-0f10265f69af"
            },
            params: {
                return: {
                    $lt: moment() // Today's datetime
                }
            }
        })
    },
    getAllPending: () => {
        return axios.get("/api/checkouts", {
            headers: {
                authorization: "86b89440-bb1d-11e9-8a28-0f10265f69af"
            },
            params: {
                status: "pending"
            }
        })
    },
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
    // Retrieve session user from session token
    getSession: (session) => {
        return axios.get('/session', { headers: { 'x-session-token': session } });
    }
    
};
