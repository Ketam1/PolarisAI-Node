const axios = require('axios');

module.exports = {

  get: async function (url, query) {
    return await axios.get(url + query).then(response => {
      return response.data;
    }).catch(error => {
      return "API error.";
    });
  },

  post: function (query) {
    return "POST is not implemented yet";
  },

};
