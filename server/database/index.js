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
const ratingsSchema = {
  recipe_name: String,
  rating: Number,
};

const Ratings = mongoose.model("ratings", ratingsSchema);

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
    // find the recipe rating with the same recipe_name
    Ratings.findOne(
      { recipe_name: rating.recipe_name },
      function (error, data) {
        if (error) {
          console.log(error);
        } else if (!error && data) {
          callback("rating already exists");
        } else {
          const newRatings = new Ratings({
            recipe_name: rating.recipe_name,
            rating: rating.rating,
          });

          //save the new rating to the database
          newRatings.save(function (error, ratingInfo) {
            if (error) {
              console.log(error);
            } else {
              console.log("rating: " + ratingInfo.recipe_name + " saved!");
              callback(ratingInfo);
            }
          });
        }
      }
    );
  },

  // get recipe ratings from database
  find: function (callback) {
    Ratings.find({}, function (err, rating) {
      if (err) {
        console.log(err);
      } else {
        callback(rating);
      }
    });
  },

  //find recipe by name
  findByName: function (name, callback) {
    Ratings.findOne({ recipe_name: name }, function (err, rating) {
      if (err) {
        console.log(err);
      } else {
        callback(rating);
      }
    });
  },

  //update rating in database
  update: function (recipe_name, rating, callback) {
    Ratings.findOneAndUpdate(
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
    Ratings.deleteOne({ recipe_name: recipe_name }, function (err, rating) {
      if (err) {
        console.log(err);
      } else {
        callback(rating);
      }
    });
  },
};
