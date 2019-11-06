const axios = require('axios');
const API_URL = 'https://polarisai.azurewebsites.net/query/';



module.exports = {

  get: async function (query) {
    return await axios.get(API_URL + query).then(response => {
      return response.data;
    }).catch(error => {
      return "API error.";
    });
  },

  post: function (query) {
    return "POST is not implemented yet";
  }

};
