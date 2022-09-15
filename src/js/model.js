import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helpers";

///////////////////////////////////////////////////

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
}
/**
 * 
 * @param {String} id 
 */
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
/**
 * 
 * @param {String} query 
 */
export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

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

