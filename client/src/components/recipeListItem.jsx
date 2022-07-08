function RecipeItem(props) {
  return (
    <div>
      <h2>{props.recipe.name}</h2>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {props.recipe.ingredients.map((ingredient, i) => (
            <li key={i}>
              {ingredient.name}: {ingredient.quantity}
            </li>
          ))}
        </ul>
        <h3>Directions</h3>
        <p>{props.recipe.directions}</p>
      </div>
    </div>
  );
}

export default RecipeItem;
