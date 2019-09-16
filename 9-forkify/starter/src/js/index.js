import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

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

    //search for recipes, returns a promisse so we have to wait
    await state.search.getResults();

    // render results on UI
    searchView.renderResults(state.search.result);
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//const search = new Search('pizza');
//console.log(search);

//search.getResults();

