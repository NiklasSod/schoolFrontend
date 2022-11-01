/**
 * Getters / Setters
 */

// utan get / set
// class Person {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   };

//   fullname() {
//     return `${this.firstName} ${this.lastName}`;
//   };
// };

// const person1 = new Person('Niklas', 'Söderberg');
// console.log(person1.fullname());

// // change func to string
// person1.fullname = ' Peter Jöback';
// console.log(person1.fullname);

/* --- */

// med get

/* --- */

// class Person {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   };

//   get fullname() {
//     return `${this.firstName} ${this.lastName}`;
//   };
// };

// const person1 = new Person('Niklas', 'Söderberg');
// console.log(person1.fullname);

// // change func to string
// person1.fullname = 'Peter Jöback';
// console.log(person1.fullname);

// med set
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  };

  set fullName(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  };
};

const p1 = new Person('Peter', 'Jöback');
p1.fullName = 'Niklas Söderberg';
console.log(p1.fullName);
