// attend to rebuild the Budgety App with knowledge of lecture 7 (ES6)

// class Budget controller
class BudgetController {
  constructor() {
    if (localStorage.getItem("exp") === null) {
      localStorage.setItem("exp", JSON.stringify([...new Map()]));
      localStorage.setItem("inc", JSON.stringify([...new Map()]));
    } else {
      localStorage.setItem("exp", localStorage.getItem("exp"));
      localStorage.setItem("inc", localStorage.getItem("inc"));
    }
  }

  addItemToLocalStorage(input) {
    let map = new Map(JSON.parse(localStorage.getItem(input.type)));
    let newItem = new Record(input.description, input.value);

    map.set(this.createNewId(map), newItem);
    localStorage.setItem(input.type, JSON.stringify([...map]));
  }

  /*  getItemsFromLocalStorage() {
    thisData.allItems.inc = thisData.allItems.inc.map(
      inc => new Income(inc.id, inc.description, inc.value)
    );
    thisData.allItems.exp = thisData.allItems.exp.map(
      exp => new Expense(exp.id, exp.description, exp.value)
    );
  } */

  createNewId(map) {
    if (map.size !== 0) {
      const keys = [...map.keys()];
      console.log(keys);
      return keys[keys.length - 1] + 1;
    } else return 0;
  }
}
class Record {
  constructor(description, value) {
    this.description = description;
    this.value = value;
    this.percentages = -1;
  }
}

//class UI controller
class UIController {
  constructor() {
    this.DOMStrings = {
      addButton: ".add__btn",
      addType: ".add__type",
      addDescription: ".add__description",
      addValue: ".add__value"
    };
  }

  getInput() {
    return {
      type: document.querySelector(this.DOMStrings.addType).value,
      description: document.querySelector(this.DOMStrings.addDescription).value,
      value: document.querySelector(this.DOMStrings.addValue).value
    };
  }
}

// class App controller
class AppController {
  constructor(ctrlUI, ctrlBudget) {
    this.ctrlUI = ctrlUI;
    this.ctrlBudget = ctrlBudget;
  }

  setupEventListeners() {
    const DOM = ctrlUI.DOMStrings;
    document
      .querySelector(DOM.addButton)
      .addEventListener("click", this.ctrlAddItem);

    document.addEventListener("keypress", el => {
      let keyCode = el.keyCode;
      if (keyCode === 13) {
        this.ctrlAddItem();
      }
    });
  }

  ctrlAddItem() {
    // 0 test
    console.log("clicked on add button");

    // 1 get input
    const input = ctrlUI.getInput();

    // 2 add item into data structure
    ctrlBudget.addItemToLocalStorage(input);

    // 3 list item into GUI
    // 4 clear fields
    // 5 update budget
    // 6 update percentages
  }

  init() {
    //this.testing(ctrlUI.DOMStrings.addButton);
    this.setupEventListeners();
  }

  testing(...log) {
    console.log("test");
    console.log(log);
  }
}

ctrlUI = new UIController();
ctrlBudget = new BudgetController();

test = new AppController(ctrlUI, ctrlBudget);
test.init();
