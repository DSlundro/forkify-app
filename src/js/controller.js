import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

/* if(module.hot){
  module.hot.accept()
} */

const controlRecipes = async function() {
  try {
    // Save recipe hash
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    searchResultsView.render(model.getSearchResultsPage())
    
    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    searchResultsView.renderSpinner()

    // 1) Get query from form input value
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    searchResultsView.render(model.getSearchResultsPage(1));

    // 4) Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage) {
  // 1) Render new results
  searchResultsView.render(model.getSearchResultsPage(goToPage));
  // 2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe serving in state
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);


}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();

