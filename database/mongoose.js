require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  // we're connected!
  console.log("connected to database");
});

// Schema for ratings
const recipeRatingSchema = {
  recipe_name: String,
  rating: Number,
};

const Rating = mongoose.model("recipe-ratings", recipeRatingSchema);

//Mongo Helper Functions
module.exports = {
  connect: function () {
    return mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
  },

  close: function () {
    return mongoose.connection.close();
  },
  //save rating to database
  save: function (rating, callback) {
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
  },

  // get recipe ratings from database
  find: function (callback) {
    Rating.find({}, function (err, rating) {
      if (err) {
        console.log(err);
      } else {
        callback(rating);
      }
    });
  },

  update: function (recipe_name, rating, callback) {
    Rating.findOneAndUpdate(
      { recipe_name: recipe_name },
      { $set: { rating: rating } },
      function (err, rating) {
        if (err) {
          console.log(err);
        } else {
          callback(rating);
        }
      }
    );
  },

  remove: function (recipe_name, callback) {
    Rating.deleteOne({ recipe_name: recipe_name }, function (err, rating) {
      if (err) {
        console.log(err);
      } else {
        callback(rating);
      }
    });
  },
};
