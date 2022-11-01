function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.revised = false;

  // this.summary = function() {
  //   return `${this.title} was written by ${this.author} in ${this.year}.`;
  // };
};

Book.prototype.summary = function() {
  return `${this.title} was written by ${this.author} in ${this.year}.`;
};

Book.prototype.bookAge = function() {
  const years = new Date().getFullYear() - this.year;
  
  if (years < 1) {
    return `${this.title} is less than 1 year old.`;
  };
  return `${this.title} is ${years} years old`;
};

Book.prototype.revise = function(year) {
  this.year = year;

  this.revised = true;
};

const book1 = new Book('Book 1', 'Niklas', 2017);
book1.revise(2020);

console.log(book1.summary());
console.log(book1.bookAge());
