const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../database/index.js");
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

// get recipe ratings from database
app.get("/ratings", (req, res) => {
  db.find(function (data) {
    res.send(data);
  });
});

// get rating by name from database
app.get(`/ratings/:recipe_name`, (req, res) => {
  db.findByName(req.query.recipe_name, function (data) {
    res.send(data);
  });
});

// post rating to database
app.post("/ratings", (req, res) => {
  const rating = req.body.data;
  db.save(rating, function (data) {
    res.send(data);
  });
});

app.put("/ratings", (req, res) => {
  const {
    params: { recipe_name },
    data: { rating },
  } = req.body;
  db.update(recipe_name, rating, function (data) {
    res.send(`updated ${recipe_name} rating to ${rating}`);
  });
});

app.delete("/ratings", (req, res) => {
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
