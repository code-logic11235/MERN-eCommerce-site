const app = require ('./app.js');
const connectDatabase = require('./config/database.js')

const dotenv = require('dotenv');

//setting up config file
dotenv.config({path: 'backend/config/config.env'})

//connecting to db
connectDatabase();

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