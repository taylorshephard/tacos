function RecipeItem(props) {
  return (
    <div>
      <h2>{props.recipe.name}</h2>
      <div>
        <h4>Ingredients</h4>
        <ul>
          {props.recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>
              {ingredient.name}: {ingredient.quantity}
            </li>
          ))}
        </ul>
        <h4>Directions</h4>
        <p>{props.recipe.directions}</p>
      </div>
    </div>
  );
}

export default RecipeItem;
