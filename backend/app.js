const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());
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