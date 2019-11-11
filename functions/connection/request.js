const axios = require('axios');




module.exports = {

  get: async function (query, url) {
    return await axios.get(url + query).then(response => {
      return response.data;
    }).catch(error => {
      return "API error.";
    });
  },

  post: function (query) {
    return "POST is not implemented yet";
  }

};
