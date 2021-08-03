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

exports.getProducts = (req, res, next)=>{
  console.log('lolS')
  res.status(200).json({
    success: true,
    message: 'this route will show all products in database.'
  })
}