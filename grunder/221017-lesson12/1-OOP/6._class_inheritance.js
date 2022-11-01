// super class (parent)
class Animal {
  constructor(name) {
    this.name = name;
  };

  makeSound() {
    return `${this.name} makes a sound!`;
  };
};

// 'normal' class (child)
class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  };

  makeSound() {
    return `${this.name} barks`;
  };
};

const animal = new Animal('Carl');
const dog = new Dog('Sarah', 12);
console.log(dog);
console.log(animal.makeSound());
console.log(dog.makeSound());
