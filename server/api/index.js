const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./index.js");
const findTacos = require("../helpers/searchGuac.js");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendStatus(201);
});

// get recipe ingredients from database
app.get("/ingredients", (req, res) => {
  var ingredient;
  db.find(function (data) {
    ingredient = data;
    res.send(ingredient);
  });
});

// post ingredient to database
app.post("/ingredients", (req, res) => {
  var ingredient = req.body;
  db.save(ingredient, function (data) {
    res.send(data);
  });
});

app.put("/ingredients", (req, res) => {
  var recipe_name = req.query.recipe_name;
  var ingredient = req.body;
  db.update(recipe_name, ingredient.ingredient, function (data) {
    res.send("ingredient updated");
  });
});

app.delete("/ingredients", (req, res) => {
  var recipe_name = req.query.recipe_name;
  db.remove(recipe_name, function (data) {
    res.send(data);
  });
});

// get taco recipes from guac-is-extra API
app.get("/taco-recipes", (req, res) => {
  console.log(req.query);
  findTacos.searchGuac(req.query, function (data) {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
