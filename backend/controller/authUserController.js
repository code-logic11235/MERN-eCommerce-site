const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

//register user =>/api/v1/register
exports.registerUser = catchAsyncErrors (async (req, res, next)=>{

    const {name, email, password} = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "2/147/147144",
        url: "https://image.flaticon.com/icons/png/512/147/147144.png"
      }
    })

  sendToken(user, 200, res);
  
  })
// Forgot Password      =>/api/v1/password/forgot
  exports.forgotPassword = catchAsyncErrors (async (req, res, next) => {
    
    const user = await User.findOne({email: req.body.email});
    
    if(!user) {
      return next(new ErrorHandler('Email not found', 404))
    }

    //get reset token 
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    //create reset password URL 
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `your password reset token is: \n \n ${resetURL} \n \n If you have not requested this email, then please ignore it.`

    try {
      await sendEmail({
        email: user.email,
        subject: 'Ecommerce site password recovery',
        message
      })
      res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
      })

    }catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({validateBeforeSave: false});

      return next(new ErrorHandler(error.message, 404))
    }
  })

//login user =>/api/v1/login

exports.loginUser = catchAsyncErrors (async (req, res, next)=>{
  const {email, password} = req.body;

  // checks if email and password is entered at all

  if(!email || !password) {
    return next(new ErrorHandler('Please enter Email or Password', 400))
  }

  //finding user in DB

  // we are using select because in our user model our select is false 
  //meaning when querying password wont be in result unless we use the select method above
  const user = await User.findOne({email}).select('+password') 
  
  
  if(!user) {
    return next(new ErrorHandler('invalid Email or Password', 401));
  }

  //checks if password is correct
  const isPasswordMatch = await user.comparePassword(password)
  
  if(!isPasswordMatch) {
    return next(new ErrorHandler('invalid Email or Password', 401));
  }

  sendToken(user, 200, res);
    
})

//logout user

exports.logout = catchAsyncErrors( async (req, res, next)=>{
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: "logged out"

  })
})