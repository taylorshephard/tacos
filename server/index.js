const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./database/index.js");
const findTacos = require("./helpers/searchGuac.js");
const app = express();
const cors = require("cors");
const { default: searchGuac } = require("./helpers/searchGuac.js");
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendStatus(201);
});

// get recipe ratings from database
app.get("/ingredients", (req, res) => {
  var rating;
  db.find(function (data) {
    rating = data;
    res.send(rating);
  });
});

// post rating to database
app.post("/ingredients", (req, res) => {
  var rating = req.body;
  db.save(rating, function (data) {
    res.send(data);
  });
});

app.put("/ingredients", (req, res) => {
  var recipe_name = req.query.recipe_name;
  var rating = req.body;
  db.update(recipe_name, rating.rating, function (data) {
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
  findTacos.searchGuac(req.query, function (data) {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
