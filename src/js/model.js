import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helpers";

///////////////////////////////////////////////////

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: 10,
    },
}

export const loadRecipe = async function(id) {
    try{
    // Get data by recipe id
    const data = await getJSON(`${API_URL}${id}`)
    // Destructure data
    const { recipe } = data.data
    // Save data in global variable and rename some of them
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
    };
    } catch (err){
    console.error(`${err}`);
    throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.results = data.data.recipes.map( rec => {
            return {
                id: rec.id,
                title: rec.title,
                sourceUrl: rec.source_url,
                image: rec.image_url,
                publisher: rec.publisher
            }
        })
        
    } catch (err) {
        console.log(err);
        throw err
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end)
}

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
    })
    state.recipe.servings = newServings;
}
