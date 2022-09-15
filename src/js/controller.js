const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const API_key = `74d94f8f-9f2e-4c23-9e72-0c6e2e7a1e95`

const showRecipe = async function() {
  try {
    // 1) Loading recipe
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
    const data = await res.json()

    // Create a new error message
    if(!res.ok) throw new Error(`${data.message} (${res.status})`)

    let {recipe} = data.data
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }

    // 2) Rendering recipe

  } catch (error) {
    alert(error);
  }
}
showRecipe()