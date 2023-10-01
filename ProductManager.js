
class ProductManager {
  #priceBase = 0.15;

  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !code) {
      console.error("Los campos title, description, price y code son obligatorios.");
      return;
    }

    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      console.error(`Ya existe un producto con el código ${code}.`);
      return;
    }

    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price: price + (this.#priceBase * price),
      thumbnail,
      code,
      stock,
      participants: [],
    };

    this.products.push(newProduct);

    console.log('Product added');
  }

  getProductById(productId) {
    if (!productId) {
      console.log('El dato productId es requerido.');
      return;
    }

    const product = this.products.find((e) => e.id === productId);

    if (!product) {
      console.log("Producto no encontrado.");
      return;
    }

    return product;
  }

  addParticipant(productId, participantName) {
    const product = this.getProductById(productId);

    if (product) {
      if (!product.participants.includes(participantName)) {
        product.participants.push(participantName);
        console.log(`Participante ${participantName} añadido al producto ${productId}`);
      } else {
        console.log(`El participante ${participantName} ya está registrado en el producto ${productId}`);
      }
    }
  }

  
}


const productManager = new ProductManager();

productManager.addProduct('Producto de prueba 1', 'Descripción del producto 1', 200, 'sin imagen', 'abc123', 25);
productManager.addProduct('Producto de prueba 2', 'Descripción del producto 2', 200, 'sin imagen', 'abc123', 25); 

console.log(productManager.getProducts());

productManager.addParticipant(1, 'Juan');
productManager.addParticipant(1, 'Pedro');


console.log(productManager.getProducts());



console.log(productManager.getProducts());

const retrievedProduct = productManager.getProductById(1);
console.log(retrievedProduct);
