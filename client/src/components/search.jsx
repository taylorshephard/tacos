import axios from "axios";
import React from "react";
import { useState } from "react";

function Search(props) {
  const [includeBeef, setIncludeBeef] = useState(false);
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
    if (includeBeef === true) {
      searchOptions.includeIngredients.push("beef");
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
        console.log(res.data);
      });
  }

  return (
    <div className="search-bar form-inline">
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={(event) => {
              handleInputChange(event.target.value);
            }}
          />
        </label>
        <br />
        Included Ingredients:
        <br />
        <label>
          Beef
          <input
            type="checkbox"
            // checked={this.state.beef}
            onChange={() => {
              console.log(!includeBeef);
              setIncludeBeef(!includeBeef);
            }}
            value="beef"
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Search;
