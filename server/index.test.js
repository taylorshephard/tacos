require("dotenv").config();
const db = require("../database/mongoose");
const expect = require("chai").expect;

const Rating = db.Rating;

describe("server/index.js", function () {
  before(() => {
    db.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  });

  after(() => {
    try {
      db.remove("recipe1", function (rating) {
        console.log("deleted");
      });
      db.connection.close();
    } catch (err) {
      console.error(err);
    }
  });

  describe("save", function () {
    it("should save a rating to the database", async function () {
      const rating = {
        recipe_name: "recipe1",
        rating: 5,
      };
      const callback = function (data) {
        expect(data).to.be.an("object");
        expect(data.recipe_name).to.equal("recipe1");
        expect(data.rating).to.equal(5);
      };
      await db.save(rating, callback);
    });
  });
  describe("update", function () {
    it("should update a rating in the database", async function () {
      const callback = function (data) {
        expect(data).to.be.an("object");
        expect(data.recipe_name).to.equal("recipe1");
        expect(data.rating).to.equal(10);
      };
      await db.update("recipe1", 10, callback);
    });
  });
  describe("find", function () {
    it("should find all ratings in the database", async function () {
      const callback = function (data) {
        expect(data).to.be.an("array");
        expect(data.length).to.equal(1);
        expect(data[0].recipe_name).to.equal("recipe1");
        expect(data[0].rating).to.equal(10);
      };
      await db.find(callback);
    });
    it("should send error if rating already exists", async function () {
      const rating = {
        recipe_name: "recipe1",
        rating: 10,
      };
      const callback = function (data) {
        expect(data).to.be.an("string");
        expect(data).to.equal("Rating already exists");
      };
      await db.save(rating, callback);
    });
  });
});
