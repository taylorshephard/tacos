import "./App.css";
import { useState, useEffect } from "react";
import RecipeList from "./components/recipeList";
import Search from "./components/search";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    console.log(ratings);
  });

  // use get to see if the user has already rated a recipe
  // if they have, set the rating to the value in the database
  function handleRatingClick(recipeName, rating) {
    axios
      .get(`http://localhost:8080/ratings/:`, {
        params: {
          recipe_name: recipeName,
        },
      })
      .then((res) => {
        if (res.data.rating) {
          setRatings(() => ({
            ...ratings,
            [recipeName]: rating,
          }));
          axios.put(`http://localhost:8080/ratings`, {
            params: {
              recipe_name: recipeName,
            },
            data: { rating },
          });
        } else {
          setRatings(() => ({
            ...ratings,
            [recipeName]: rating,
          }));
          axios.post(`http://localhost:8080/ratings`, {
            data: { recipe_name: recipeName, rating },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <header className="App-header">Find Tacos!</header>
      <Search onSearch={setRecipes} />
      <RecipeList recipes={recipes} onRatingClick={handleRatingClick} />
    </div>
  );
}

export default App;
