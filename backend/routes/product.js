const express = require('express');
const router = express.Router();

const {getProducts, newProduct, getSingleProduct, updateProduct} = require('../controller/productController.js');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);
router.route('/admin/product/:id').get(getSingleProduct)

router.route('/admin/product/:id').put(updateProduct)

module.exports = router;