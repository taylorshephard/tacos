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

// Schema for ingredients
const ingredientsSchema = {
  quantity: String,
  name: String,
  preparation: String,
};

const Ingredient = mongoose.model("ingredients", ingredientsSchema);

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
  //save ingredient to database
  save: function (ingredient, callback) {
    // find the recipe ingredient with the same name
    Ingredient.findOne({ name: ingredient.name }, function (error, data) {
      if (error) {
        console.log(error);
      } else if (!error && data) {
        callback("ingredient already exists");
      } else {
        const newIngredient = new Ingredient({
          name: ingredient.name,
          quantity: ingredient.quantity,
          preparation: ingredient.preparation,
        });

        //save the new ingredient to the database
        newIngredient.save(function (error, ingredientInfo) {
          if (error) {
            console.log(error);
          } else {
            console.log("ingredient: " + ingredientInfo.name + " saved!");
            callback(ingredientInfo);
          }
        });
      }
    });
  },

  // get recipe ingredients from database
  find: function (callback) {
    Ingredient.find({}, function (err, ingredient) {
      if (err) {
        console.log(err);
      } else {
        callback(ingredient);
      }
    });
  },

  update: function (name, ingredient, callback) {
    Ingredient.findOneAndUpdate(
      { name: name },
      { $set: { ingredient: ingredient } },
      function (err, ingredient) {
        if (err) {
          console.log(err);
        } else {
          callback(ingredient);
        }
      }
    );
  },

  remove: function (name, callback) {
    Ingredient.deleteOne({ name: name }, function (err, ingredient) {
      if (err) {
        console.log(err);
      } else {
        callback(ingredient);
      }
    });
  },
};
