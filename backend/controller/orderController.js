const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new order    =>  /api/v1/order/new

exports.newOrder = catchAsyncErrors( async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id
  })
  
  res.status(200).json({
    success: true,
    order
  })

})

//Get single order    =>   /api/v1/order/:id

exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
  const order = await Order.findById(req.param.id).populate('user', 'name email');

  if(!order) {
    return next(new ErrorHandler('order ID not found', 404));
  }

  res.status(200).json({
    success: true,
    order
  })
})

//Get logged in user orders   =>   /api/v1/orders/me


exports.myOrders = catchAsyncErrors( async (req, res, next) => {
  const order = await Order.find({user: req.user.id})

  res.status(200).json({
    success: true,
    order
  })
})