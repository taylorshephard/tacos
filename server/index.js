const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database/mongoose");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get recipe ratings
app.get("/recipe-ratings", (req, res) => {
  var rating;
  db.find(function (data) {
    rating = data;
    res.send(rating);
  });
});

// post rating
app.post("/recipe-ratings", (req, res) => {
  var rating = req.body;
  db.save(rating, function (data) {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
