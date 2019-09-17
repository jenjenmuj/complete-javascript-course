import Search from './models/Search';
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

const controlSearch = async () => {
    // get query from the view
    const query = searchView.getInput(); //TODO

    // if query 
    if(query) {
        //new search obj and add it to state
        state.search = new Search(query);
    }

    // preprare user interface
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    //search for recipes, returns a promisse so we have to wait
    await state.search.getResults();

    // render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// event delegation
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
