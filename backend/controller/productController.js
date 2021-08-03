const Product = require('../models/product.js')

//create new product => /api/v1/product/new

exports.newProduct = async (req, res, next)=>{

  const product = await Product.create(req.body); // get data from the body and create a new product using the product model
  // have not delt with images yet. dealing with images later using cloudinary
  res.status(201).json({
    success: true,
    product
  })
}
//get all products => /api/v1/products
exports.getProducts = async (req, res, next)=>{
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products
  })
}

//get single product details => /api/v1/product/ :id

exports.getSingleProduct = async (req, res, next)=>{
  const product = await Product.findById(req.params.id);
  // if product does not exist
  if(!product)  {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }
  // else product DOES exist
  res.status(200).json({
    success: true,
    product
  })
}