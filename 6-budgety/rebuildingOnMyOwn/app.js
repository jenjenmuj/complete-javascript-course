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
    let newID = this.createNewId(map);
    let newItem = new Record(input.description, input.value, newID);

    map.set(newID, newItem);
    localStorage.setItem(input.type, JSON.stringify([...map]));

    return map.get(newID);
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
  constructor(description, value, id) {
    this.description = description;
    this.value = value;
    this.id = id;
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
      addValue: ".add__value",
      expanseList: ".expenses__list",
      incomeList: ".income__list"
    };
  }

  listItem(newItem) {
    console.log(newItem);
    if (newItem.type === "inc") {
      document
        .querySelector(this.DOMStrings.incomeList)
        .insertAdjacentHTML(
          "beforeend",
          `<div class="item clearfix" id="${newItem.type}-${
            newItem.id
          }"> <div class="item__description">${
            newItem.description
          }</div><div class="right clearfix"><div class="item__value">${
            newItem.value
          }</div><div class="item__delete"><button class="item__delete--btn"><i ="ion-ios-close-outline"></i></button></div></div></div>`
        );
    } else if (newItem.type === "exp") {
      document
        .querySelector(this.DOMStrings.expanseList)
        .insertAdjacentHTML(
          "beforeend",
          `<div class="item clearfix" id="${newItem.type}-${
            newItem.id
          }"><div class="item__description">${
            newItem.description
          }</div><div class="right clearfix"><div class="item__value">${
            newItem.value
          }</div><div class="item__percentage">${
            newItem.percentages
          }</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
        );
    } else console.log("no item type");
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
    let newItem;
    // 2 add item into data structure
    newItem = ctrlBudget.addItemToLocalStorage(input);

    // 3 list item into GUI
    ctrlUI.listItem(newItem);
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
