const axios = require("axios");

function searchGuac(searchTerm, callback) {
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
    },
  };

  axios(options)
    .then((response) => {
      const data = excludeIngredients(
        searchTerm.excludeIngredients,
        response.data
      );
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// API excludeIngredients not working, This is a function to make sure that the ingredients that are excluded are not included in the results
function excludeIngredients(excludeIngredientsList, ingredients) {
  return ingredients.filter((recipe) => {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredientName = recipe.ingredients[i].name;
      if (
        excludeIngredientsList &&
        excludeIngredientsList.split(",").includes(ingredientName)
      ) {
        return false;
      }
    }
    return true;
  });
}

module.exports = { searchGuac };
