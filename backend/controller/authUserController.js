const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

    const token = user.getJwtToken();

    res.status(201).json({
      success: true,
      token
    })
  
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

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token
  })
    
})