// 1
const hello = () => {
  console.log('Hello world');
};

console.log('*Uppgift 1*');
hello();

// 2
const greet = (name) => {
  console.log('Hej ' + name + ' hur mår du?');
};
const name = 'Niklas';

console.log('\n*Uppgift 2*');
greet(name);

// 3
const calc = (numberOne, numberTwo) => {
  return numberOne + numberTwo;
};
const numberOne = 7;
const numberTwo = 12;

console.log('\n*Uppgift 3*');
const calcAnswer = calc(numberOne, numberTwo);
console.log(`${numberOne} + ${numberTwo} = ${calcAnswer}`);

// 4
const tip = (sum, percent) => {
  let total = sum + ((sum * percent) / 100);
  return total;
}

console.log('\n*Uppgift 4*');
const sum = 214;
const percent = 9;

const totalSum = tip(sum, percent);
console.log(`Your total payment including the ${percent}% tip is: ${totalSum} sek.`);
