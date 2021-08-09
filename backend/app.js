const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());

// import all routes
const products = require('./routes/product.js');



app.use('/api/v1', products);
//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;