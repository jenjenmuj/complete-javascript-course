import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

// global state of the app
/*
Search object
Current recipe object
Shopping list obect
Liked recipes
*/
const state = {};

/*
* Seacrh Controller
*/
const controlSearch = async () => {
    // get query from the view
    const query = searchView.getInput(); 

    // if query 
    if(query) {
        //new search obj and add it to state
        state.search = new Search(query);
    }

    // preprare user interface
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
        //search for recipes, returns a promisse so we have to wait
        await state.search.getResults();

        // render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    } catch(error) {
        alert('Something went wrong with the search ...')
        clearLoader();
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


// event delegation for btns
elements.searchResPages.addEventListener('click', e => {
    // implementing closest method, so if we click on text or icon of the button it will still work
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        // e are getting string from the dataset, so we have to convert it to decimal (10)
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/*
* Recipe Controller
*/

const controlRecipe = async () => {
    // Get ID from url 
    const id = window.location.hash.replace('#','');
    console.log(id);

    if (id) {
        // Prepare the UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get the recipe data 
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // call CalcTime and CalcServings
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render the recipe
            console.log(state.recipe);
        } catch(error) {
            alert('Error processing recipe');
        }

    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// better code than the one above
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));