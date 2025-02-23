const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { name, price, description, inStock } = req.body;
  try {
    const newProduct = new Product({ name, price, description, inStock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, price, description, inStock } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, inStock },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted', product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
};

exports.getProductCount = async (req, res) => {
  try {
    const count = await Product.countDocuments({ price: { $gte: 100 } });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error counting products', error: err });
  }
};
