function Animal(name) {
  this.name = name;
};

Animal.prototype.makeSound = function() {
  return `${this.name} makes a sound!`;
};

const animal = new Animal('Carl');
console.log(animal.makeSound());

function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
};

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog('Nasse', 11);
console.log(dog);
console.log(dog.makeSound());
