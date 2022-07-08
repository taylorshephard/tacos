function RecipeItem(props) {
  return (
    <div>
      <h2>{props.recipe.name}</h2>
      <p>rating: {props.recipe.rating}</p>
      {[1, 2, 3, 4, 5].map((rating, i) => (
        <button
          key={i}
          onClick={() => props.onRatingClick(props.recipe.name, rating)}
        >
          {rating}
        </button>
      ))}
      stars
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
