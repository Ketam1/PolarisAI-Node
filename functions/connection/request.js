const axios = require('axios');
const API_URL = 'https://polarisai.azurewebsites.net/query/';



module.exports = {
  get: async function (query) {
    return await axios.get('https://polarisai.azurewebsites.net/query/zada');
  },
  post: function (query) {
    return "POST is not implemented yet";
  }
};
