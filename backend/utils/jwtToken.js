// Create and send token and saved in cookie

const sendToken = (user, statusCode, res) =>{
  
  //create Jwt token 
  const token = user.getJwtToken();

  // options for cookie
  const options = {
    expires: new Date ( Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true // security feature so cookie cannot be access by js code
  } 
                                // (key, value, options )
  res.status(statusCode).cookie('token', token, options).json ({
    success: true,
    token,
    user
  }) 
}

module.exports = sendToken;