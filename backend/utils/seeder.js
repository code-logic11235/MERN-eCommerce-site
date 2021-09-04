const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const Products = require('../data/products.json');

// setting dotenv file

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async ()=>{
  try {
    await Product.deleteMany();
    console.log('products are deleted');

    await Product.insertMany(Products);
    console.log('All products are added');

    process.exit();
  }catch(error){
    console.log(error.message)
    process.exit();
  }
}

seedProducts()