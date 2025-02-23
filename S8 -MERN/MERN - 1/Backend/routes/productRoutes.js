const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductCount,
} = require('../controllers/productController');

const router = express.Router();

router.post('/product', createProduct);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/products/count', getProductCount);

module.exports = router;
