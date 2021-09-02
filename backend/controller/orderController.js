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
exports.getSingleOrderByID = catchAsyncErrors( async (req, res, next) => {
  console.log('hello1')
  const order = await Order.findById(req.params.id).populate('user', 'name email');

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
  console.log('hello')
  console.log(req.user.id)
  const orders = await Order.find({user: req.user.id})

  res.status(200).json({
    success: true,
    orders
  })
})