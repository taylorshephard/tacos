# Tacos!

## Tech Stack

- [React](https://reactjs.org/) "^18.2.0"
- [Express](https://expressjs.com/) "^4.18.1"
- [Mongodb with Mongoosejs](https://mongoosejs.com/) "^6.4.1"
- [guac-is-extra](https://github.com/madeintandem/guac-is-extra)

## Getting Started

1. If not installed already, install the database, Mongodb, follow instructions [here](https://www.mongodb.com/docs/manual/administration/install-community/).

2. To install the project dependencies, run `npm install` in the tacos directory. Then go to the client directory and run `npm install`

3. To start the server, run `npm start` in the tacos directory. To start the client, run `npm start` in the client directory. Go to [`localhost:3000`](http://localhost:3000) to view the website.

### Files

The `client/` directory contains all of the front-end code. Within `client/`, `public/` contains the `index.html` and `src` contains all of the react components.

`server/` contains all of the backend code. `helpers` contains a file: `searchGuac.js` which is used to get recipes from the `guac-is-extra` API.

### Features

**1.** Search for taco recipes by name

**2.** Include Ingredients: The User can choose ingredients that will make their food spicy or recipes with fresh ingredients

The `spicy` choice checks to see if any of the recipes have the word `chili` in any of the ingredients
The `fresh` choice checks to see if any of the recipes have the word `fresh` in any of the ingredients
I used the queries `includeIngredients=chili` and `includeIngredients=fresh` to get the recipes from the `guac-is-extra` API

**3.** Exclude Ingredients: The User can exclude ingredients if the are looking for a vegetarian or non-dairy choice.

The `vegetarian` choice gets the recipes that do not have the words `fish,chicken,beef,pork,turkey,meat,lobster,steak,bacon` in any of the ingredients
The `nonDairy` choice gets the recipes that do not have the words `milk,cheese,yogurt,sour cream` in any of the ingredients

I used the queries `excludeIngredients=fish,chicken,beef,pork,turkey,meat,lobster,steak,bacon` and `includeIngredients=milk,cheese,yogurt,sour cream` to get the recipes from the `guac-is-extra` API but it was sending back an internal server error.

So I made an `excludeIngredients` function that excludes the recipes that have those ingredients. It is in the `server/helpers/searchGuac.js` file.

**4.** I stored recipe ratings to the database. The user is able to rate a recipe between 1 to 5 stars
Each document is just a recipe name and a rating. for example:

```javascript
{
     "_id": "62c7f40c2e70ee10296f7a13",
     "recipe_name": "Spaghetti Tacos",
     "rating": 5,
     "__v": 0
 }
```

## Todo

I really enjoyed working on this app. I did not get to finish a couple things including:

- Todo 1: if a recipe has a rating saved in the database already, show the rating when the page loads

-Todo 2: Add styling
