const Product = require('../models/product.js')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors ( async (req, res, next)=>{

    const product = await Product.create(req.body); // get data from the body and create a new product using the product model
    // have not delt with images yet. dealing with images later using cloudinary
    res.status(201).json({
      message: 'created new product',
      success: true,
      product
    })
  }
)
//get all products => /api/v1/products


exports.getProducts = catchAsyncErrors (async (req, res, next)=>{

    const resultPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: products.length,
      productCount,
      products
    })
  }
)
//get single product details => /api/v1/admin/product/ :id

exports.getSingleProduct = catchAsyncErrors (async (req, res, next)=>{
    const product = await Product.findById(req.params.id);
    // if product does not exist
    if(!product)  {
      // return res.status(404).json({
      //   success: false,
      //   message: 'Product not found'
      // })
      return next(new ErrorHandler('Product not found', 404));
    }
    // else product DOES exist
    res.status(200).json({
      success: true,
      product
    })
  }
)
//update product => /api/v1/admin/product/ :id

exports.updateProduct = catchAsyncErrors (async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product)  {
      // return res.status(404).json({
      //   success: false,
      //   message: 'Product not found'
      // })
      return next(new ErrorHandler('Product not found', 404));

    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    })
    res.status(200).json({
      success: true,
      product
    })
  }
)
//delete product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors ( async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product)  {
      // return res.status(404).json({
      //   success: false,
      //   message: 'Product not found'
      // })
      return next(new ErrorHandler('Product not found', 404));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: 'Product is deleted'
    })
  }
)