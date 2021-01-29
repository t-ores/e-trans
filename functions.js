//ФУНКЦИИ

//FUNCTION DECLARATION
function greet(name) {
 console.log('Привет ', name)
}
//greet('Вася');

//FUNCTION EXPRESSION
const greet2 = function greet2(name) {
 console.log('Привет ', name);
};
//greet2('Вася');

//АНОНИМНЫЕ ФУНКЦИИ
// let counter = 0;
// const interval = setInterval(function () {
//  console.log(++counter);
// }, 1000);

let counter = 0;
const interval = setInterval(function () {
 if (counter === 5){
  clearInterval(interval);
 }else {
  console.log(++counter);
 }
}, 1000);

//3 СТРЕЛОЧНЫЕ ФУНКЦИИ
const arrow = (name, age) => {
 console.log('Привет', name, age);
};
//arrow('Вася', 25);

const arrow2 = name => console.log('Привет', name);
//arrow2('Вася');

const pow2 = num => num ** 2;
//console.log(pow2(5));

//4 ПАРАМЕТРЫ ПО УМОЛЧАНИЮ
const sum = (a = 40, b = a * 2) => a + b;
//console.log(sum(41, 4));
//console.log(sum());

function sumAll1(...all) {
 console.log(all)
}
//sumAll1(1, 2, 3, 4, 5);

function sumAll(...all) {
 let result = 0;
 for(let num of all){
  result += num
 }
 return result;
}
const res = sumAll(1, 2, 3, 4, 5);
//console.log(res);

//5 ЗАМЫКАНИЯ

function createMember(name) {
 return function (lastName) {
  console.log(name + lastName)
 }
}

const logWhisLastName = createMember('Вася');
//console.log(logWhisLastName);
//console.log(logWhisLastName('Пєтя'));
//console.log(logWhisLastName('Дзюба'));