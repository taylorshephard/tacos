import axios from "axios";
import React from "react";
import { useState } from "react";

function Search(props) {
  const [includeChili, setIncludeChili] = useState(false);
  const [includeFresh, setIncludeFresh] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [nonDairy, setNonDairy] = useState(false);

  const [search, setSearch] = useState("");

  function handleInputChange(searchInput) {
    if (searchInput.length) {
      setSearch(searchInput);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const searchOptions = {
      name: search,
      includeIngredients: [],
      excludeIngredients: [],
    };
    if (includeChili === true) {
      searchOptions.includeIngredients.push("chili");
    }
    if (includeFresh === true) {
      searchOptions.includeIngredients.push("fresh");
    }
    if (vegetarian === true) {
      searchOptions.excludeIngredients.push(
        "fish",
        "chicken",
        "beef",
        "pork",
        "turkey",
        "meat",
        "lobster",
        "steak",
        "bacon"
      );
    }
    if (nonDairy === true) {
      searchOptions.excludeIngredients.push(
        "milk",
        "cheese",
        "yogurt",
        "sour cream"
      );
    }

    axios
      .get("http://localhost:8080/taco-recipes", {
        params: {
          ...searchOptions,
          includeIngredients: searchOptions.includeIngredients.join(","),
          excludeIngredients: searchOptions.excludeIngredients.join(","),
        },
      })
      .then((res) => {
        props.onSearch(res.data);
      });
  }

  return (
    <div className="search-bar form-inline">
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="name"
            onChange={(event) => {
              handleInputChange(event.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <h4>Included Ingredients:</h4>
        {["Chili", "Fresh"].map((ingredient, i) => (
          <label key={i}>
            {ingredient === "Chili"
              ? `Make if Spicy, include ${ingredient}`
              : `Make if Fresh, include ${ingredient} Ingredients`}
            <input
              type="checkbox"
              name={ingredient}
              // use eval() to access the variable name
              checked={eval(`include${ingredient}`)}
              onChange={() => {
                const includeFunc = `setInclude${ingredient}`;
                // use eval() to access the variable name
                eval(includeFunc)(!eval(`include${ingredient}`));
              }}
            />
            <br />
          </label>
        ))}
        <br />
        <h4>Exclude Ingredients:</h4>
        {["vegetarian", "nonDairy"].map((exclusion, i) => {
          return (
            <label key={i}>
              {exclusion}
              <input
                type="checkbox"
                name={exclusion}
                // use eval() to access the variable name
                checked={eval(`${exclusion}`)}
                onChange={(event) => {
                  let exclusionFunc;
                  if (exclusion === "vegetarian") {
                    exclusionFunc = setVegetarian;
                  } else if (exclusion === "nonDairy") {
                    exclusionFunc = setNonDairy;
                  }
                  // use eval() to access the variable name
                  exclusionFunc(!eval(`${exclusion}`));
                }}
              />
              <br />
            </label>
          );
        })}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Search;
