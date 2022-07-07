const axios = require("axios");

let searchGuac = (searchTerm, callback) => {
  const options = {
    method: "GET",
    url: "https://guac-is-extra.herokuapp.com/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },

    params: {
      name: searchTerm.name,
      includeIngredients: searchTerm.includeIngredients,
      excludeIngredients: searchTerm.excludeIngredients,
    },
  };

  axios(options)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { searchGuac };
