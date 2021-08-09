class ErrorHandler extends Error {
  constructor(message, statusCode){
    super(message) // super is parent class (Error) contructor
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports = ErrorHandler;