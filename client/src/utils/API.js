import axios from 'axios';

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
        return axios.post(`/api/items`, itemData);
    },
    // Retrieve session user from session token
    getSession: (session) => {
        return axios.get('/session', { headers: { 'x-session-token': session } });
    }
};
