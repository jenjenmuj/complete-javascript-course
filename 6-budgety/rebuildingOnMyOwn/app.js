// attend to rebuild the Budgety App with knowledge of lecture 7 (ES6)

// class Budget controller
class BudgetController {
  constructor() {
    if (localStorage.getItem("exp") === null) {
      localStorage.setItem("exp", JSON.stringify([...new Map()]));
      localStorage.setItem("inc", JSON.stringify([...new Map()]));
      localStorage.setItem("totalExp", 0);
      localStorage.setItem("totalInc", 0);
    } else {
      localStorage.setItem("exp", localStorage.getItem("exp"));
      localStorage.setItem("inc", localStorage.getItem("inc"));
      localStorage.setItem("totalExp", localStorage.getItem("totalExp"));
      localStorage.setItem("totalInc", localStorage.getItem("totalInc"));
    }
  }

  addItemToLocalStorage(input) {
    let map = this.getItemsFromLocalStorage(input.type);
    let newID = this.createNewId(map);
    let newItem = new Record(input.description, input.value, newID, input.type);

    map.set(newID, newItem);
    localStorage.setItem(input.type, JSON.stringify([...map]));

    return map.get(newID);
  }

  getItemsFromLocalStorage(type) {
    let map = new Map(JSON.parse(localStorage.getItem(type)));
    return map;
  }

  createNewId(map) {
    if (map.size !== 0) {
      const keys = [...map.keys()];
      //console.log(keys);
      return keys[keys.length - 1] + 1;
    } else return 0;
  }

  calculateBudget() {
    let sum = 0;
    let expenses = this.getItemsFromLocalStorage("exp");
    let incomes = this.getItemsFromLocalStorage("inc");
    expenses.forEach(el => sum += parseInt(el.value));
    localStorage.setItem("totalExp", sum);
    sum = 0;
    incomes.forEach(el => sum += parseInt(el.value));
    localStorage.setItem("totalInc", sum);
  }

  returnValue(input) {
    return input.value;
  }
}
class Record {
  constructor(description, value, id, type) {
    this.description = description;
    this.value = value;
    this.id = id;
    this.percentages = -1;
    this.type = type;
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
    //console.log(newItem);
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

  clearFields() {
    document.querySelector(this.DOMStrings.addDescription).value = "";
    document.querySelector(this.DOMStrings.addValue).value = "";
  }

  updateUIBudget() {
    let budget = ctrlBudget.calculateBudget();

    //ctrlBudget.getBudget();
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
    ctrlUI.clearFields();
    // 5 update budget
    ctrlUI.updateUIBudget();
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
