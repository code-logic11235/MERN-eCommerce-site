const express = require('express');
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authUser')

const {newOrder, getSingleOrder, myOrders} = require ('../controller/orderController');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/order/me').get(isAuthenticatedUser, myOrders);

module.exports = router;