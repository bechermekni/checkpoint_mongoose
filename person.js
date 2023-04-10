//Import the mongoose module

const mongoose = require("mongoose");

// Define schema
const PModel = mongoose.Schema({
  name: { 
    type: String,
     required: true
     },
  age: Number,
  favoriteFoods: [String],
});

// exporting the Person model
module.exports = mongoose.model("Person", PModel);