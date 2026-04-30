const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const name = params.get("name");

// Case 1: Normal recipes (by ID)
if (id) {
  fetch(`http://localhost:5000/recipes/${id}`)
    .then(res => res.json())
    .then(showData);
}

// Case 2: Featured recipes (by name)
else if (name) {
  fetch("http://localhost:5000/recipes")
    .then(res => res.json())
    .then(data => {
      const recipe = data.find(r => r.name === name);
      showData(recipe);
    });
}

function showData(data) {
  document.getElementById("title").innerText = data.name;
  document.getElementById("image").src = data.image;
  document.getElementById("ingredients").innerText = data.ingredients;
  document.getElementById("steps").innerText = data.steps;
}

function goBack() {
  window.history.back();
}