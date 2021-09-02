const express = require('express');
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authUser')

const {
        newOrder, 
        getSingleOrderByID, 
        myOrders, 
        allOrder
      } = require ('../controller/orderController');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderByID);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrder);


module.exports = router;