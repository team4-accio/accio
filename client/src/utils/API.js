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
        })
    },
    addNewItem: (itemData) => {
        console.log(itemData)
        return axios.post(`/api/items`, itemData)
    }
};
