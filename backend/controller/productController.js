const Product = require('../models/product.js')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const { count } = require('../models/product.js')

//create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors ( async (req, res, next)=>{
  
    req.body.user = req.user.id;

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

 
    const resultsPerPage = 4;
    const productsCount = await Product.countDocuments();
    console.log(req.query)
    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
   

    let products = await apiFeatures.query;
    let countTotal = products.length

    if(countTotal > resultsPerPage) {

      apiFeatures.pagination(resultsPerPage)
    } 


     products = await apiFeatures.query;

    setTimeout(()=>{  
      res.status(200).json({
            success: true,
            countTotal: countTotal,
            productsCount,
            products,
            resultsPerPage
          })
    },800)
    
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

    setTimeout(()=>{  

    res.status(200).json({
      success: true,
      product
    })
  },800)
  }
)
//update product => /api/v1/admin/product/ :id

exports.updateProduct = catchAsyncErrors (async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product)  {

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


//Create a new review   =>   /api/v1/review


exports.createProductReview = catchAsyncErrors ( async (req, res, next)=>{

  const {rating, comment, productId} = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  )

  if(isReviewed) {
    //update review
    product.reviews.forEach(review =>{
      if(review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    })

  } else {
    //create review
    product.reviews.push(review);
    product.numOfReviews += 1;
    product.numberOfReviews = product.reviews.length
  }

  // handle ratings

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    sucess: true
  })
})

//get product reviews   => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors ( async (req, res, next)=>{

  let product = await Product.findById(req.query.id);
  if(!product)  {

    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
}
)

//delete product reviews   => /api/v1/reviews
exports.deleteReview = catchAsyncErrors ( async (req, res, next)=>{

  let product = await Product.findById(req.query.productId);

  if(!product)  {
    return next(new ErrorHandler('Product not found', 404));
  }
  
  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
  const numOfReviews = reviews.length
  const ratings = product.reviews.reduce((acc, item)=> item.rating + acc, 0) / reviews.length

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,

  })
}
)