const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');


exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next)=>{
  //authenticate user on the cookie from backend 
  const {token} = req.cookies;
  
  if(!token) {
    return next(new ErrorHandler('Please login to access resource', 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET );

  req.user = await User.findById(decoded.id)
  next();
})