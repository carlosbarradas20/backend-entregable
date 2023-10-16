const fs = require('fs');

class ProductManager {
  #priceBase = 0.15;

  constructor(path) {
    this.path = path;
  }


  async addProduct(data) {
    const { title, description, price, thumbnail, code, stock, participants } = data;
    if (!title || !description || !price || !thumbnail || !code || !stock || !participants) {
      throw new Error('todos los campos son requeridos');
    }

 
    //leer el archivo 
    const users = await getJsonFromFile(this.path);
    const newUser = {
      id: users.length +1,
      title,
      description,
      price: price * (this.#priceBase * price),
      thumbnail,
      code,
      stock,
      participants,
    };
    //inyectar el nuevo usurio
    users.push(newUser);
    //escribit los usurios en el archivo
    await saveJsonInFile(this.path, users);
    console.log('el usurio se registro');
  }

  getProducts() {
    return getJsonFromFile(this.path);
  }

   async update(id, data) {
    const {title, description, price, thumbnail,code,stock,participants} = data;
    const users = getJsonFromFile(this.path);
    const position = users.findIndex((u) => u.id === id);
    if (position === -1) {
      throw new ('usurio no encontrado')
    }
    if (title) {
      users[position].title = title;
    }
    if (description) {
      users[position].description = description;
    }
    if (price) {
      users[position].price = price;
    }
    if (thumbnail) {
      users[position].thumbnail = thumbnail;
    }
    if (code) {
      users[position].code = code;
    }
    if (stock) {
      users[position].stock = stock;
    }
    if (participants) {
      users[position].participants = participants;
    }


    await saveJsonInFile(this.path,users);
    console.log('usurio actulizado ');
  }
  async removeProductById(id){
    let products = await getJsonFromFile(this.path);
    let position = products.findIndex((u) => u.id === id);

    if (position !== -1) {
      products = products.splice(position,1);
      console.log('producto eliminado')  
      saveJsonInFile(this.path,products);
      console.log(`producto eliminado por id${id}deleted`)
    }else{
      throw new Error('producto no encontrado');
    }
  }

}

const getJsonFromFile = async (path) => {
  if (!fs.existsSync(path)) {
    return [];
  }
  const content = await fs.promises.readFile(path, 'utf-8');
  return JSON.parse(content);
};

const saveJsonInFile = (path, data) => {
  const content = JSON.stringify(data, null, '\t');
  return fs.promises.writeFile(path, content, 'utf-8');

}



async function test() {

  const productManager = new ProductManager('./Users.json');
 const data = {
    title: 'carlos ',
    description: 'producto de prueba',
    price: '25',
    thumbnail: '22',
    code: 'javascript',
    stock: '250',
    participants: '2',
  }
  await productManager.addProduct(data);
  console.log(await productManager.getProducts());
  await productManager.update(1);
}


test();


