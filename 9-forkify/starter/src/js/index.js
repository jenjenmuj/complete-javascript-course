import Search from './models/Search';

// global state of the app
/*
Search object
Current recipe object
Shopping list obect
Liked recipes
*/
const state = {};

const search = new Search('pizza');
console.log(search);

search.getResults();
