const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser');
// const bodyparser = require('body-parser')
const cloudinary = require('cloudinary')

app.use(express.json());
app.use(cookieParser());

//setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_Key: process.env.CLOUDINARY_API_KEY,
  api_Secret: process.env.CLOUDINARY_API_SECRET

})

// import all routes
const products = require('./routes/product');
const authUser = require('./routes/authUser');
const order = require('./routes/order');


app.use('/api/v1', products);
app.use('/api/v1', authUser);
app.use('/api/v1', order);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;