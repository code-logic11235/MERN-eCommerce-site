const express = require('express');
const router = express.Router();

const {getProducts, newProduct, getSingleProduct} = require('../controller/productController.js');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProduct)

module.exports = router;