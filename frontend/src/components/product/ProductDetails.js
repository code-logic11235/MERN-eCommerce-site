import React, {useEffect} from 'react'
import Loader from '../layout/Loader'
import ReviewProductModal from './ReviewProductModal';
import {Carousel} from 'react-bootstrap';

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux';
import {getProductDetails, clearErrors} from '../../action/productActions';
import { showModal, hideModal } from '../../action/modalActions';
import MetaData from '../layout/MetaData';


const ProductDetails = ({match}) => {
  const alert = useAlert;
  const dispatch = useDispatch();
  const {loading, error, product} = useSelector(state=> state.productDetails);
  const {modal} = useSelector(state=> state.modal);
// console.log(product.images[0].url)

  useEffect(() => {
    dispatch(hideModal());
    dispatch(getProductDetails(match.params.id))
    
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error, match.params.id])

  function onClick () {
    dispatch(showModal());

  }
  return (
    <>
    <MetaData title = {product.name}/>
      {loading ? <Loader /> : 
        <>
          <div className = 'product-details-container'>
            <div className="left-side" >
              <Carousel pause='hover'>
                {product.images && product.images.map(image => (
                <Carousel.Item key={image.public_id}>
                     <img id="product_image" src= {image.url} alt={product.title} height="500" width="500"/>
                </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className = 'right-side'>
              <div className = 'right-container'>

              <div className = 'product_name'>
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>
              </div>

              <hr/>

              <div className='product-ratings'>
                <div className='star-outer'>
                  <div className="star-inner" style = {{width: `${product.ratings/5 *100}%`}}></div>
                </div>
              <span id="no_of_reviews">{product.numOfReviews} reviews</span>
              </div>

              <hr/>

              <p id="product_price">${product.price}</p>
              <div className="stock-counter">
                <span className="btn-minus">-</span>

                <input type="number" className="form-control count d-inline" value="1" readOnly />

                <span className="btn-plus">+</span>
              <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
              </div>


              <hr/>

              <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

              <hr/>

              <div className="product-description">
                <h4 >Description:</h4>
                <p>{product.description}</p>
              </div >
                
                <hr/>

                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
                <button id="review_btn" type="button" className="btn btn-primary mt-4" onClick = {onClick}>
                              Submit Your Review
                </button>
                {modal ? <ReviewProductModal/> : null}
                

            </div>
              </div>

          </div>    

          

          
          
                        
                    
        </> }
  
    </>      
  )
}
export default ProductDetails
