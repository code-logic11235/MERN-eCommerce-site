import React from 'react'

import {Link} from 'react-router-dom';

const Product = ({product}) => {
  return (

  <div className="product-tile"> 
    <div className="img-top">
      <img className="product-img-top" src={product.images[0].url} /> 
       
    </div>
    <div className = 'product-tittle'>
      <h5>
        <Link className = 'product-name-link' to={`/product/${product._id}`} href="">{product.name}</Link>
      </h5>
    </div>
    <div className='product-ratings'>
      <div className='star-outer'>
        <div className="star-inner" style = {{width: `${product.ratings/5 *100}%`}}></div>
      </div>
    </div>
    <p id="product-price">${product.price}</p>
    
  </div>

  )
}

export default Product
