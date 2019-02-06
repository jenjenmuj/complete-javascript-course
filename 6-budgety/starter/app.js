// ifee and closure

/* var budgetController = (function() {
    var x = 23;

    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return add(b);
        }
    }

})();

var uIController = (function() {

    //some code

})();


var controller = (function(budgetCtrl, uICtrl) {

    var z = budgetCtrl.publicTest(9);

    return {
        anotherPublic: function() {
            console.log(z);
        }
    }
})(budgetController, uIController);
 */



//BUdget controller
var budgetController = (function() {

    
})();


//UI controller
var uIController = (function() {

    //some code

})();


// Global app controller
var controller = (function(budgetCtrl, uICtrl) {

    var ctrlAddItem = function() {
        // 1. get the input data

        // 2. add the item into budget ctrl

        // 3. add item to the UI

        // 4. calculate the budget

        // 5. displey the budget

        console.log('It works');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        console.log(event);

        if (event.keyCode === 13 || event.which === 13) {
            console.log('enter pressed');
            ctrlAddItem();
        } else {

        }
        
    })

})(budgetController, uIController);