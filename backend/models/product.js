const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product Name cannot be longer than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [5, 'Product price cannot be longer than 5 characters'],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
    trim: true,
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [{ //image is array of obj
    // image stored in cloudinary
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Electronics', 
        'Cameras', 
        'Laptops', 
        'Accessories', 
        'Headphones',
        'Food', 
        'Books', 
        'Cloths/Shoes', 
        'Beauty/Health', 
        'Sports', 
        'Outdoor'
      ],
        message: 'Please select correct category for product'
    }
  },
  seller: {
    type: String,
    required: [true, 'Please enter product seller']
  },
  stock: {
    type: Number,
    required: [true, 'Please eneter product stock'],
    maxLength: [5, 'Product name cannot exceed 5 characters'],
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0 
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)