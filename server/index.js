const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database/mongoose");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get recipe ratings from database
app.get("/recipe-ratings", (req, res) => {
  var rating;
  db.find(function (data) {
    rating = data;
    res.send(rating);
  });
});

// post rating to database
app.post("/recipe-ratings", (req, res) => {
  var rating = req.body;
  db.save(rating, function (data) {
    res.send(data);
  });
});

app.put("/recipe-ratings", (req, res) => {
  var recipe_name = req.query.recipe_name;
  var rating = req.body;
  console.log(recipe_name);
  db.update(recipe_name, rating.rating, function (data) {
    res.send("rating updated");
  });
});

app.delete("/recipe-ratings", (req, res) => {
  var recipe_name = req.query.recipe_name;
  console.log(recipe_name);
  db.remove(recipe_name, function (data) {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
