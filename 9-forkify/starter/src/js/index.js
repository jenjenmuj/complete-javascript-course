import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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
    //console.log(id);

    if (id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

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
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );

        } catch(error) {
            clearLoader();
            alert('Error processing recipe');
            console.log(error);
        }

    }
    //console.log(state.recipe);
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// better code than the one above
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/*
* List Controller
*/
const controlList = () => {
    // Create a new list if htere is non
    if (!state.list) state.list = new List();

    // Add all ingredients to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

//Hnadle dele and udpdate lis tevents
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);

    }
    //handle the update value
     else if (e.target.matches('.shopping__count-value')) {
        //read the data form interface
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);

    }
});

/*
* Likes Controller
*/
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // user has not liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add the like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to the UI list
        //console.log(state.likes);
        likesView.renderLike(newLike);

    // user has liked current recipe
    } else {
        // remove the like in the state
        state.likes.deleteLike(currentID);

        // Toggle the like button 
        likesView.toggleLikeBtn(false);

        // remove like in the UI list
        //console.log(state.likes);
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenuBtn(state.likes.getNumLikes());
}

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    //Restore Likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenuBtn(state.likes.getNumLikes());

    //redner existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// handling recipe button clikcs
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // INcrease button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        // add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // like button pressed -> call like controller
        controlLike();
    }

});
