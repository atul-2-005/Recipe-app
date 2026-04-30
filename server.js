const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// ==========================
// CONNECT MONGODB
// ==========================
mongoose.connect("mongodb://127.0.0.1:27017/recipesDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ==========================
// SCHEMA
// ==========================
const RecipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: String,
    steps: String
});

const Recipe = mongoose.model("Recipe", RecipeSchema);


// ==========================
// GET ALL RECIPES
// ==========================
app.get("/recipes", async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});


// ==========================
// ADD RECIPE
// ==========================
app.post("/recipes", async (req, res) => {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.json({ message: "Recipe saved!" });
});


// ==========================
// DELETE RECIPE
// ==========================
app.delete("/recipes/:id", async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.get("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});




// ==========================
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});