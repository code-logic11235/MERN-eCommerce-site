class ErrorHandler extends Error {
  constructor(message, errorCode){
    super(message) // super is parent class (Error) contructor
    this.statusCode = this.statusCode;

    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports = ErrorHandler;