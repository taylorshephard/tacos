var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipe-ratings", {
  useNewUrlParser: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to database");
});

const recipeRatingSchema = {
  recipe_name: String,
  rating: Number,
};

const Rating = mongoose.model("recipe-ratings", recipeRatingSchema);

const save = function (rating, callback) {
  Rating.findOne({ recipe_name: rating.recipe_name }, function (error, data) {
    if (error) {
      console.log(error);
    } else if (!error && data) {
      callback("Rating already exists");
    } else {
      const newRating = new Rating({
        recipe_name: rating.recipe_name,
        rating: rating.rating,
      });

      newRating.save(function (error, ratingInfo) {
        if (error) {
          console.log(error);
        } else {
          console.log("rating: " + ratingInfo.recipe_name + " saved!");
          callback(ratingInfo);
        }
      });
    }
  });
};

const find = function (callback) {
  Rating.find({}, function (err, rating) {
    if (err) {
      console.log(errr);
    } else {
      callback(rating);
    }
  });
};

module.exports = {
  save,
  find,
};
