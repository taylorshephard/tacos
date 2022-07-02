require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

const connect = function () {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
};

const close = function () {
  return mongoose.connection.close();
};

const db = mongoose.connection;
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

//save rating to database
const save = function (rating, callback) {
  // find the recipe rating with the same name
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

      //save the new rating to the database
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

// get recipe ratings from database
const find = function (callback) {
  Rating.find({}, function (err, rating) {
    if (err) {
      console.log(err);
    } else {
      callback(rating);
    }
  });
};

const deleteRating = function (recipe_name, callback) {
  Rating.deleteOne({ recipe_name: recipe_name }, function (err, rating) {
    if (err) {
      console.log(err);
    } else {
      callback(rating);
    }
  });
};

module.exports = {
  Rating,
  connect,
  close,
  save,
  find,
  deleteRating,
};
