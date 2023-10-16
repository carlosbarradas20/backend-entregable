const express = require('express');
const fs = require('fs').promises;

class ProductManager {

  constructor(path) {
    this.path = path;
  }

  async addProduct(data) {
  }

  async getProducts(limit) {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);

      if (limit) {
        return products.slice(0, limit);
      }

      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find(p => p.id === id);

      return product || null;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    
  }

  async removeProductById(id) {
    
  }
}

const app = express();

const productManager = new ProductManager('./Users.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const products = await productManager.getProducts(limit);

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'servidor fallo' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status().json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status().json({ error: 'error de server' });
  }
});

app.listen(8080, () => {
  console.log(`servidor de prueba ${8080}`);
});
