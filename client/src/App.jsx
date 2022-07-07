import "./App.css";
import { useState } from "react";
import RecipeList from "./components/recipeList";
import Search from "./components/search";

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="App">
      <header className="App-header">Find Tacos!</header>
      <Search onSearch={setRecipes} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
