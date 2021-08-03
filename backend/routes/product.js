const express = require('express');
const router = express.Router();

const {getProducts, newProduct} = require('../controller/productController.js');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);

module.exports = router;