const ErrorHandler = require ('../utils/errorHandler');


module.exports = (err, req, res, next) =>{
  err.statusCode = err.statusCode || 500;
  // err.message = err.message || 'Internal server Error';
  if(process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack
    })
  }
  if(process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;

    // wrong mongoose object ID error 
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // handle Mongoose Validation Error

    if( err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message, 400)
    }

    // handle mongoose duplicate key errors or duplicate email
    if(err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered, ${Object.keys(err.keyValue)} already exist. `
      error = new ErrorHandler(message, 400)
    }

    //handle wrong JWT error  
    if( err.name === 'JsonWebTokenError') {
      const message = 'JSON web token is invalid'
      error = new ErrorHandler(message, 400)
    }
    //handle expired JWT error
    if( err.name === 'TokenExpiredError') {
      const message = 'JSON web token is expired'
      error = new ErrorHandler(message, 400)
    }


    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal server Error'
    })
  }
}