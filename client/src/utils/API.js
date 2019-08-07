import axios from "axios"
import moment from "moment"

export default {
    getAllUsers: () => {
      return axios.get('/api/users');
    },
    getFilteredUsers: () => {

    },
    getOverdueUsers: () => {
        axios.request({
            method: 'GET',
            url: `/api/users`,
            params: {
                'status': 'approved',
                'return': {
                    '$lt': moment()
                }
            },
          
          })
    }
  };
  
// axios.get('/api/users')
//             .then((response) => {
//                 console.log(response);
//                 this.sortUsers(response.data)
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })