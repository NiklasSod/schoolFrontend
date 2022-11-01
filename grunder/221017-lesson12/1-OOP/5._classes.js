class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  };

  summary() {
    return `${this.title} was written by ${this.author} in ${this.year}.`;
  };

  bookAge() {
    const years = new Date().getFullYear() - this.year;
  
    if (years < 1) {
      return `${this.title} is less than 1 year old.`;
    };
    return `${this.title} is ${years} years old`;
    };

    revise(year) {
      this.year = year;

      this.revised = true;
    };
};

const book1 = new Book('Book 1', 'Niklas', 2015);
console.log(book1.summary());
book1.revise(2020);
console.log(book1.bookAge());
