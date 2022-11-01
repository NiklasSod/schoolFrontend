// const newProduct = (name, price, desc) => {
//   const product = {
//     productName: name,
//     price,
//     description: desc,
//   };

//   return product;
// };

// const p1 = newProduct('Product 1', 100, 'this is a prod');

function Product(name, price, desc) {
  this.productName = name;
  this.price = price;
  this.desc = desc;

  this.summary = function() {
    return `The product ${this.productName} costs ${this.price} kr.`;
  };
};

// Instans av ett objekt
const product1 = new Product('Product 1', 100, 'This is a prod desc');
const product2 = new Product('Product 2', 125, 'This is another prod desc');

// console.log(product1);
