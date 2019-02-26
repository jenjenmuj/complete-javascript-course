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
  var localDataKey = "data";

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    var thisData;  
    thisData = getLocalData;
    if (totalIncome > 0) {
        thisData.percentage = Math.round((thisData.value / totalIncome) * 100);
    } else {
        thisData.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    var thisData;  
    thisData = getLocalData;

    return thisData.percentage;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Totals = function(exp, inc) {
    this.exp = exp;  
    this.inc = inc;
  }

  var calculateTotal = function(type) {
    var sum = 0,
      thisData;
    thisData = getLocalData();
    thisData.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    setTotals(type, sum);
    //thisData.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  var Data = function(allItems, totals, budget, percentage) {
      this.allItems = allItems;
      this.totals = totals;
      this.budget = budget;
      this.percentage = percentage;
  }

  function getLocalData() {
    var keys, thisData;
    keys = Object.keys(localStorage);
    //debugger;
    if (keys.length !== 0) {
      thisData = JSON.parse(localStorage.getItem(localDataKey));
    } else {
      localStorage.setItem(localDataKey, JSON.stringify(data));
      thisData = JSON.parse(localStorage.getItem(localDataKey));
    }

    thisData = new Data(thisData.allItems, thisData.totals, thisData.budget, thisData.percentage);

    thisData.allItems.inc = thisData.allItems.inc.map(
      inc => new Income(inc.id, inc.description, inc.value)
    );
    thisData.allItems.exp = thisData.allItems.exp.map(
      exp => new Expense(exp.id, exp.description, exp.value)
    );

    thisData.totals =  new Totals(thisData.totals.exp, thisData.totals.inc);

    return thisData;
  }

  function setTotals(type, sum) {
    var thisData;
    thisData = getLocalData();

    thisData.totals[type] = sum;
    localStorage.setItem(localDataKey, JSON.stringify(thisData));
  }

  function setBudget(budget) {
    var thisData;
    thisData = getLocalData();
    thisData.budget = budget;
    localStorage.setItem(localDataKey, JSON.stringify(thisData));
  }

  function setPercentages() {
    var thisData;
    thisData = getLocalData();
    thisData.percentages = percentages;
    localStorage.setItem(localDataKey, JSON.stringify(thisData));
  }

  return {
    addItem: function(type, des, val) {
      var newItem, ID, keys, thisData;

      thisData = getLocalData();

      //create new id
      if (thisData.allItems[type].length > 0) {
        ID = thisData.allItems[type][thisData.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //create new item based on exp or inc
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      //push is to our dsata structure
      thisData.allItems[type].push(newItem);

      // addint new item into local storage as an String which is JSON file
      localStorage.setItem(localDataKey, JSON.stringify(thisData));
      //return the new element
      return newItem;
    },

    deleteItem: function(type, id) {
      //debugger;
      var index, ids, thisData;

      thisData = getLocalData();

      ids = thisData.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        thisData.allItems[type].splice(index, 1);
      }
      localStorage.setItem(localDataKey, JSON.stringify(thisData));
    },

    calculateBudget: function() {
      //calculate total income and expenses
      debugger;
      calculateTotal("exp");
      calculateTotal("inc");
      var thisData;
      thisData = getLocalData();

      //calculate the budget: income - expenses
      thisData.budget = thisData.totals.inc - thisData.totals.exp;

      //calculate the % of income that we spent
      if (thisData.totals.inc > 0) {
        thisData.percentage = Math.round(
          (thisData.totals.exp / thisData.totals.inc) * 100
        );
      } else {
        thisData.percentage = -1;
      }
      localStorage.setItem(localDataKey, JSON.stringify(thisData));
    },

    calculatePercentages: function() {
      var thisData;
      thisData = getLocalData();
      thisData.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(thisData.totals.inc);
      });
    },

    getPercentage: function() {
      var thisData;
      thisData = getLocalData();
      var allPercentages = thisData.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      return allPercentages;
    },

    getBudget: function() {
      var thisData;
      thisData = getLocalData();
      return {
        budget: thisData.budget,
        percentage: thisData.percentage,
        totalInc: thisData.totals.inc,
        totalExp: thisData.totals.exp
      };
    }
    /* 
    testing: function() {
      console.log(data);
    } */
  };
})();

/*************************************** */
//UI controller
/******************************************/
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercetagesLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec, type;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1];

    return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
  };

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newhtml, element;
      // create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //replace placeholder text
      newhtml = html.replace("%id%", obj.id);
      newhtml = newhtml.replace("%description%", obj.description);
      newhtml = newhtml.replace("%value%", formatNumber(obj.value, type));

      //insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newhtml);
    },

    deleteListItem: function(selectorID) {
      //first store the element to remove
      var el = document.getElementById(selectorID);
      //get to the parent cuz we cannot delete current element and than delete the (child) element
      el.parentNode.removeChild(el);
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      var type;
      obj.budget >= 0 ? (type = "inc") : (type = "exp");

      //do not show plus or minus sign if the total budget is 0, but show 0.00

      obj.budget === 0
        ? (document.querySelector(DOMstrings.budgetLabel).textContent =
            obj.budget + ".00")
        : (document.querySelector(
            DOMstrings.budgetLabel
          ).textContent = formatNumber(obj.budget, type));

      //document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, "exp");

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "----";
      }
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(
        DOMstrings.expensesPercetagesLabel
      );

      nodeListForEach(fields, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }
      });
    },

    displayMonth: function() {
      var now, year, month;
      now = new Date();
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent =
        months[month + 0] + " " + year;
    },

    changedType: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          "," +
          DOMstrings.inputDescription +
          "," +
          DOMstrings.inputValue
      );

      nodeListForEach(fields, function(cur) {
        //each time where there is class red focus on the cur element, it removes it or if its not there it adds it
        cur.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

/*************************************** */
// Global app controller
/*************************************** */
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      } else {
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changedType);
  };

  var updateBudget = function() {
    // 1. calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    // 3. displey the budget
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    // calculate procentages
    budgetCtrl.calculatePercentages();
    // read them form budget condtroler
    var percentages = budgetCtrl.getPercentage();
    // update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. get the input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. add the item into budget ctrl
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //budgetCtrl.testing();
      // 3. add item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the fields
      UICtrl.clearFields();
      // 5. Calculate and update budget
      updateBudget();
      // 6. calculate and update percetanges
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      //inc-0
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1 delete item form data strucutre
      budgetCtrl.deleteItem(type, ID);
      // 2. delet item =from UI
      UICtrl.deleteListItem(itemID);
      // 3. update and show new budget
      updateBudget();
      // 4. calculate and update percetanges
      updatePercentages();
    }
  };

  return {
    init: function() {
      console.log("Application has started");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        percentage: -1,
        totalInc: 0,
        totalExp: 0
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
