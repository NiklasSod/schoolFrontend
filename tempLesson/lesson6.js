const add = (num1, num2) => {
  return num1 + num2;
}

// samma som ovan, annat sätt att skriva på
// function add(num1, num2) {
//   return num1 + num2;
// }

const num1 = 5;
const num2 = 4;

console.log(add(num1, num2)); // svar 9, 5+4

const text1 = "3";
const text2 = "2";

console.log(add(text1, text2)); // svar 32, sträng 3 + sträng 2

/*
------------------------------
*/

// då man inte vet användarens input måste man kanske göra något liknande för att tvinga fram Number ist för String

const add2 = (number1, number2) => {
  return number1 + number2;
}

const number1 = 4;
const number2 = "7";

console.log(add2(number1, number2)); // svar 47, 4 görs om till sträng

const add3 = (number1, number2) => {
  if(typeof(number1) === 'number' && typeof(number2) === 'number'){
    return number1 + number2;
  }
  // else fix problem
  return "errMessage";
  /*
  let realNum1 = Number(number1);
  let realNum2 = Number(number2);
  return realNum1 + realNum2; // ger 11, korrekt
  */
};

console.log(add3(number1, number2)); // errMessage