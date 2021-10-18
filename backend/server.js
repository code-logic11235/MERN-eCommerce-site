const app = require ('./app.js');
const connectDatabase = require('./config/database.js')

const dotenv = require('dotenv');

const express = require('express')
app.use(express.urlencoded({extended: true}));

const cloudinary = require('cloudinary')

// handle unccaught excceptions 
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('shutting down server due to uncaught exception');
  server.close(()=>{
    process.exit(1)
  })
})

//setting up config file
dotenv.config({path: 'backend/config/config.env'})

//connecting to db
connectDatabase();

//setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_Key: process.env.CLOUDINARY_API_KEY,
  api_Secret: process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(process.env.PORT, ()=>{
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`  )
})


//Handle unhandled promise rejection
process.on('unhandledRejection', err =>{
  console.log(`ERROR: ${err.message}`);
  console.log('shutting down server due to unhandle promise rejection');
  server.close(()=>{
    process.exit(1)
  })
})