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
      if (searchTerm.excludeIngredients.length) {
        const data = excludeIngredients(
          searchTerm.excludeIngredients,
          response.data
        );
        callback(data);
      } else {
        callback(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// guac-is-extra API excludeIngredients not working, This is a function to make sure that the ingredients that are excluded are not included in the results
function excludeIngredients(excludeIngredientsList, recipes) {
  // return array where recipe name doesn't include any of the ingredients in the excludeIngredientsList and recipe ingredients doesn't include any of the ingredients in the excludeIngredientsList
  return recipes.filter((recipe) => {
    if (excludeIngredientsList) {
      return !excludeIngredientsList.split(",").some((ingredient) => {
        const ingredients = recipe.ingredients
          .map((ingredient) => {
            return ingredient.name.toLowerCase();
          })
          .filter((food) => {
            return food.includes(ingredient);
          });

        return (
          recipe.name.toLowerCase().includes(ingredient.toLowerCase()) ||
          ingredients.length
        );
      });
    }
    return null;
  });
}
module.exports = { searchGuac };
