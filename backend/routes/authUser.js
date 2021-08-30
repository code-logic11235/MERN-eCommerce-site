const express = require('express');
const router = express.Router();

const {
  registerUser, 
  loginUser, 
  logout, 
  forgotPassword, 
  resetPassword, 
  getUserProfile,
  updatePassword,
  updateProfile
} = require ('../controller/authUserController');

const {isAuthenticatedUser} = require('../middlewares/authUser')


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').get(isAuthenticatedUser, updatePassword);
router.route('/me/update').get(isAuthenticatedUser, updateProfile);


module.exports = router;