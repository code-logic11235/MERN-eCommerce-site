const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter Valid email address ']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be longer than 6 characters'],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
  


})

//encrypting password before saving user
userSchema.pre('save', async function (next){
  if(!this.isModified('password')) {
    next()
  }
  const SALT_WORK_FACTOR = 10
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
})

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//return jason wrapped token (JWT)

userSchema.methods.getJwtToken = function (){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
}

// reset password / generate reset token
userSchema.methods.getResetPasswordToken = function () {
  
  //generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash and set to resetPasswordToken
  this.resetPasswordToken = Crypto.createHash('sha256').update(resetToken).digest('hex')
  
  // set token expiration 
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('User', userSchema);