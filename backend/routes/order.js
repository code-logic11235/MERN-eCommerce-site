const express = require('express');
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authUser')

const {newOrder} = require ('../controller/orderController');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

module.exports = router;