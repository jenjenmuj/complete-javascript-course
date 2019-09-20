import axios from 'axios';
import {key} from '../config' 

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {   
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch(error) {
            console.log(error);
            alert('Something went from =(');
        }
    }

    //assuming that we need 15 for every 3 ingredience
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']; 
        const units = [...unitsShort, 'kg', 'g'];

        // newIngredient becomes an array de to map function, where it will go throw all ingredience for recipe and copy it to the const
        const newIngredients =  this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // parse ingredients into count , unit and ingredinece
            const arrIng = ingredient.split(' ');
            // includes() returns false if there is no index and returns true if it find match and the findIndex will return the index
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            
            if(unitIndex > -1) {
                //there is a unit and count
                // example for 4 1/2 cups, our count will be [4, 1/2]
                // example for 4 cups, or count is [4]
                // example for 1-1/3 
                /* *** MY SOLUTION HAVE TO CHECK (out of API Calls) ***
                const arrCount = arrIng.slice(0, unitIndex);
                let pomCount;
                if (arrCount.length === 2) {
                    const pom = arrCount.split('/');
                    pomCount = parseInt(pom[0]) + (parseInt(pom[1]) / parseInt(pom[2]));
                } else pomCount = parseInt(arrCount[0]);
                
                objIng = {
                    count: pomCount,
                    unit: arrCount[unitIndex],
                    ingredient: arrIng.slice(arrIng[unitIndex - 1]).join(' ')
                }
                */

                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(arrIng[unitIndex + 1]).join(' ')
                }


            } else if(parseInt(arrIng[0], 10)) {
                // there is no unit, but there is number on 1st position
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    //entire element except of the 1st one and join them with space
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIndex === -1) {
                // there is no unit and no number on 1st pos
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }
}