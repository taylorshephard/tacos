import RecipeListItem from "./recipeListItem.jsx";

function RecipeList(props) {
  return (
    <div className="recipe-list">
      {props.recipes.map((recipe) => (
        <RecipeListItem
          key={recipe.name}
          onRatingClick={props.onRatingClick}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

export default RecipeList;
