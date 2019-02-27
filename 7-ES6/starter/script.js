// Lecture = let and const

// ES5
/*
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Muller';

console.log(name5);

// ES6
// const is for values which we dont want to change
// let is for those we want to change

const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Muller';

console.log(name6);
*/

// var are function scoped
// let and const are block scoped {here}
/*
// ES5
function driversLicence5(passedTest) {
  if (passedTest) {
    var firstName = "John";
    var yearOfBirth = 1990;
    console.log(firstName + " born in = " + yearOfBirth);
  }
}

driversLicence5(true);

// ES6
function driversLicence6(passedTest) {

    let firstName;
    const yearOfBirth = 1990;
  if (passedTest) {
    firstName = "John";
  }
  console.log(firstName + " born in = " + yearOfBirth);
}

driversLicence6(true);



let i = 23;

for(let i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);

*/

/******************************** */
// Lecture: Block and IIFEs
/******************************** */

/* //ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b); ///cannot see a or b
console.log(c); /// can see c because it is fuction scoped not block scoped

//ES5
(function() {
    var c = 3;
})();
 */
/******************************** */
// Lecture: Strings
/******************************** */

/* let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
  return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6 templet literals

console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

// New string methods

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes('n Smi'));
console.log(n.includes(' '));
console.log(n);
console.log(`${firstName} `.repeat(5)); */

/******************************** */
// Lecture: Arrow functions
/******************************** */
/* 
const years = [1990, 1998, 1992, 1862];

// ES5 callback functions
var ages5 = years.map(function(el) {
  return 2016 - el;
});

console.log(ages5);

//ES 6 
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

// ES6 with more arguments, dont have to use the return key word

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

//with more lines of code - have to use the return key word
ages6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);
 */
/******************************** */
// Lecture: Arrow functions 2
/******************************** */
//arrow functions share this keyword (lexical this variable)

// ES5
/* 
var box5 = {
  color: "green",
  position: 1,
  clickMe: function() {
    var self = this;
    document.querySelector(".green").addEventListener("click", function() {
      var str =
        "This is box number " + self.position + " and it is " + self.color;
      alert(str);
    });
  }
};
 */
//box5.clickMe();

// ES6
/* 
const box6 = {
  color: "green",
  position: 1,
  clickMe: function() {
    document.querySelector(".green").addEventListener("click", () => {
      var str =
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  }
};

box6.clickMe();
 */
// box66's surounding is global scale (this) and therefore we need to use the "function" statement to create local scope instead of an arrow
/* const box66 = {
  color: "green",
  position: 1,
  clickMe: () => {
    document.querySelector(".green").addEventListener("click", () => {
      var str =
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  }
};

box66.clickMe(); */
/* 
function Person(name) {
  this.name = name;
}

//ES5
Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(el) {
    return this.name + " is friend whth " + el;
  }.bind(this));
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("John").myFriends5(friends);
 */
//ES 6
/* 
function Person(name) {
  this.name = name;
}

Person.prototype.myFriends6 = function(friends) {
  var arr = friends.map(el => `${this.name} is friend whth ${el}`);
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("John").myFriends6(friends);
 */

/******************************** */
// Lecture: Destructuring
/******************************** */
//trying to get all elements from array to different variable

//ES5
/* 
var john = ['John', 23];
var name = john[0];
var age = john[1];

 */
//ES6
/* 
const [name, age] = ['John', 26];
console.log(`His name is ${name} and he is ${age} years old.` );

const obj = {
  firstName: 'Joghn',
  lastName: 'Smith'
};

const {firstName, lastName} = obj;

console.log(firstName, lastName);

const {firstName: a, lastName: b} = obj;

console.log(a, b);
 */

// in ES5 if we would have to return more than 1 variable, we would return an object, with destructuring it is easier

/* 
 function calcAgeRetirement(year) {
   const age = new Date().getFullYear() - year;
   return [age, 65 - age];
 }

 const [age, retirement] = calcAgeRetirement(1992);
 console.log(age, retirement);
  */
/******************************** */
// Lecture: Arrays
/******************************** */

//ES5
/* const boxes = document.querySelectorAll('.box');

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
});  */

// ES6
/* const boxes = document.querySelectorAll('.box');
//this transform boxes into array
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue')
 */
// ES5 way to loop throw hte boxes
/* 
const boxes = document.querySelectorAll('.box');

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
}); 
for (var i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === 'box blue') {
    // continue will skip this iteration 
    continue;
  }

  boxesArr5[i].textContent = 'I changed to blue';
}
 */

//ES 6
/* const boxes = document.querySelectorAll(".box");
const boxesArr6 = Array.from(boxes);
for (const cur of boxesArr6) {
  if (cur.className.includes('blue')) {
    // continue will skip this iteration
    continue;
  }

  cur.textContent = "I changed to blue";
}
 */

//new methods of array

//ES5
/* var ages = [12, 18 , 8 , 12 ,14 ,11];
 var full = ages.map(function(cur) {
   return cur >= 18;
 });

console.log(full, full.indexOf(true));
console.log(ages[full.indexOf(true)]);
 */
/* 
var ages = [12, 18 , 8 , 12 ,14 ,11];

const full = ages.findIndex(cur => cur >= 18);
console.log(full);

console.log(ages.find(cur => cur >= 18));
 */

/******************************** */
// Lecture: Spread operator
/******************************** */
/* 
function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 21, 12);
console.log(sum1);

//ES5

var ages = [18, 30, 21, 12];
var sum2 = addFourAges.apply(null, ages);

console.log(sum2);

// ES6 spread operator
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ["John", "Jane", "Mark"];
const familyMuller = ["Mary", "Bob", "Ann"];
const bigFamily = [...familySmith, "Lily", ...familyMuller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
Array.from(all).forEach(cur => cur.style.color = 'purple')
 */
/******************************** */
// Lecture: Rest parameters
/******************************** */

//it receive couple values and transform them into array

//ES5
/* function isFullAge5() {
  console.log(arguments);
  var argsArr = Array.prototype.slice.call(arguments);

  argsArr.forEach(function(cur) {
    console.log(2019 - cur >= 18);
  });
}
isFullAge5(1990, 2005, 1965);
isFullAge5(1990, 2005, 1965, 2010, 1984); */

// ES6

/* function isFullAge6(...years) {
  years.forEach(cur => console.log(2019 - cur >= 18));
}

isFullAge6(1990, 2005, 1965, 2010, 1984); */

//ES5
/* function isFullAge5(limit) {
  console.log(arguments);
  var argsArr = Array.prototype.slice.call(arguments, 1);
  console.log(argsArr);
  argsArr.forEach(function(cur) {
    console.log(2019 - cur >= limit);
  });
}
isFullAge5(21, 1990, 2005, 1965);
isFullAge5(21, 1990, 2005, 1965, 2010, 1984); 
 */
// ES6
/* 
function isFullAge6(limit, ...years) {
  years.forEach(cur => console.log(2019 - cur >= limit));
}

isFullAge6(21, 1990, 2005, 1965, 2010, 1984); 
 */
/******************************** */
// Lecture: Default parameters
/******************************** */

//ES5
/* function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

  lastName === undefined ? lastName = 'Smith' : lastName;
  nationality === undefined ? nationality = 'Murica': nationality;

  this.firstName = firstName;
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1992, 'Diaz', 'Spanish');
 */

//ES6
/* function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'Murican') {
  this.firstName = firstName;
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1992, 'Diaz', 'Spanish'); */

/******************************** */
// Lecture: Maps
/******************************** */
/* 
const question = new Map();
question.set('question', 'What is the major official name of lastest JS ver?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'False!');

/* console.log(question.get('question'));
console.log(question.size);

// if we run delete command on non existing key, nothing hapends
if(question.has(4)) {
  //question.delete(4);
  console.log('Answer 4 is here');
} */

//question.clear();

//Looping thru the map
//question.forEach((value, key) => console.log(`This is the key: ${key} and this is value: ${value}`));

// question.entries() return all entries of our question map
/*
console.log(question.get('question'));

for (let [key, value] of question.entries()) {
  if (typeof(key) === 'number') {
    console.log(`Answer ${key}: ${value}`);  
  }
  //console.log(`This is the key: ${key} and this is value: ${value}`);
}

const ans = parseInt(prompt('Write the correct answer'));

console.log(question.get(ans === question.get('correct')));

//in hash map, we can use anzthing as keys or value
// they are iterable  
*/

/******************************** */
// Lecture: Classes
/******************************** */

//es5
/* 
var Person5 = function(firstName, job, yearOfBirth) {
  this.firstName = firstName;
  this.job = job;
  this.yearOfBirth = yearOfBirth;
};

Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear - this.yearOfBirth;
  console.log(age);
};

var john5 = new Person5("John", 1990, "teacher");

//ES6
// we have to declarer a class b4 we ant to use it
// classes do not have atributes
class Person6 {
  constructor(firstName, yearOfBirth, job) {
    this.firstName = firstName;
    this.job = job;
    this.yearOfBirth = yearOfBirth;
  }
  calculateAge() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
  }

  static greeting() {
    console.log('Hey there');
  }
}

const john6 = new Person6("John", 1990, "teacher");

Person6.greeting();
 */

/******************************** */
// Lecture: Classes and Subclasses
/******************************** */
/* 
var Person5 = function(name, job, yearOfBirth) {
  this.name = name;
  this.job = job;
  this.yearOfBirth = yearOfBirth;
};

Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
};

var john5 = new Person5("John", 1990, "teacher");

var Athlete5 = function(name, job, yearOfBirth, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
};

// conecting two object constructers
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function() {
  this.medals++;
  console.log(this.medals);
};

var johnAtlete5 = new Athlete5("John", 1990, "swimmer", 3, 10);

johnAtlete5.calculateAge();
johnAtlete5.wonMedal();

//ES6
class Person6 {
  constructor(firstName, yearOfBirth, job) {
    this.firstName = firstName;
    this.job = job;
    this.yearOfBirth = yearOfBirth;
  }
  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }
}

class Athlete6 extends Person6 {
  constructor(name, job, yearOfBirth, olympicGames, medals) {
    //calling superclass (person6) and assigning those varibale
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }

  wonMedal() {
    this.medals++;
    console.log(this.medals);
  }
}

const johnAtlete6 = new Athlete6("John", "swimmer",1992, 3, 10);

johnAtlete6.wonMedal();
johnAtlete6.calculateAge();
 */

 
/******************************** */
// Lecture: Coding challange 8
/******************************** */


