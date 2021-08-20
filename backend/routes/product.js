const express = require('express');
const router = express.Router();

const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct} = require('../controller/productController');
const {isAuthenticatedUser} = require('../middlewares/authUser');


router.route('/products').get(getProducts);
router.route('/product/new').post(isAuthenticatedUser, newProduct);
router.route('/admin/product/:id').get(getSingleProduct);

router.route('/admin/product/:id')
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;