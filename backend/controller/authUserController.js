const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//register user =>/api/v1/register

exports.registerUser = catchAsyncErrors (async (req, res, next)=>{

    const {name, email, password} = req.body;
    console.log(name, email, password)
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "2/147/147144",
        url: "https://image.flaticon.com/icons/png/512/147/147144.png"
      }
    })

    res.status(201).json({
      success: true,
      user
    })
  
  })
