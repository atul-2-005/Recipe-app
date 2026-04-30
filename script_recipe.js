const searchBtn = document.querySelector(".searchbtn button");

searchBtn.addEventListener("click", function () {
    let input = document.querySelector(".search-section input").value.toLowerCase();
    let recipes = document.querySelectorAll(".recipe");

    recipes.forEach(function (recipe) {
        let text = recipe.innerText.toLowerCase();

        if (text.includes(input)) {
            recipe.style.display = "block";
        } else {
            recipe.style.display = "none";
        }
    });
});


const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close");
const title = document.getElementById("recipeTitle");
const details = document.getElementById("recipeDetails");


function attachEvents() {
    const buttons = document.querySelectorAll(".recipe-btn");

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {

            let recipeName = btn.parentElement.querySelector("p").innerText;

            title.innerText = recipeName;
            details.innerText = "This is a delicious recipe. More details can be added here.";

            popup.style.display = "flex";
        });
    });
}


closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
});


async function addRecipe() {

    let name = document.getElementById("recipeInput").value;
    let image = document.getElementById("imageInput").value;
    let ingredients = document.getElementById("ingredientsInput").value;
    let steps = document.getElementById("stepsInput").value;

    await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, image, ingredients, steps })
    });

    displayRecipes();
}

async function displayRecipes() {

    let res = await fetch("http://localhost:5000/recipes");
    let recipes = await res.json();

    let container = document.getElementById("userRecipes");

    container.innerHTML = "";

    recipes.forEach((recipe) => {
    container.innerHTML += `
        <div class="recipe">
            <img src="${recipe.image}">
            <p>${recipe.name}</p>

            <button onclick="viewRecipe('${recipe._id}')">
                View Recipe
            </button>

            <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
        </div>
    `;
});

    attachEvents();
}

async function deleteRecipe(id) {
    await fetch(`http://localhost:5000/recipes/${id}`, {
        method: "DELETE"
    });

    displayRecipes();
}

function showDetails(name, ingredients, steps) {

    document.getElementById("recipeTitle").innerText = name;

    document.getElementById("recipeDetails").innerHTML = `
        <h3>Ingredients:</h3>
        <p>${ingredients}</p>

        <h3>Steps:</h3>
        <p>${steps}</p>
    `;

    document.getElementById("popup").style.display = "flex";
}

function viewRecipe(id) {
  window.location.href = `recipe_details.html?id=${id}`;
}

function viewFeaturedRecipe(name) {
  window.location.href = `recipe_details.html?name=${encodeURIComponent(name)}`;
}

window.onload = function () {
    displayRecipes();
};