const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const order = require('../models/order');



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

  const orders = await Order.find({user: req.user.id})

  res.status(200).json({
    success: true,
    orders
  })
})

//Get ALL orders   =>   /api/v1/admin/orders
exports.allOrder = catchAsyncErrors( async (req, res, next) => {

  const orders = await Order.find()
  let totalAmount = 0;

  orders.forEach(order =>{
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  })
})


//update / process order   =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors( async (req, res, next) => {


  const order = await Order.findById(req.params.id)

  if(order.orderStatus === 'Delivered') {
    return next (new ErrorHandler('Order has been delivered', 400))
  }

  order.orderItems.forEach( async item =>{
    await updateStock(item.product, item.quantity);
  })

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();

  await order.save()

  res.status(200).json({
    success: true,
  })
})

async function updateStock(id, quantity){
  console.log(id)
  const product = await Product.findById(id);
  console.log(quantity)
  console.log('-------------')
  console.log(product)

  product.stock = product.stock - quantity;

  await product.save({validateBeforeSave: false});
}