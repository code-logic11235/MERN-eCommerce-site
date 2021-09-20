import React from 'react'
import Loader from '../layout/Loader'


import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from '../../action/productActions'


const ProductDetails = () => {

  const dispatch = useDispatch();

  const {loading} = useSelector(state=> state.products);

  return (
    <>
      {loading ? <Loader /> : 
        <>
          <div className = 'product-details-container'>
            <div className="left-side" >
              <img id="product_image" src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt="sdf" height="500" width="500"/>
            </div>

            <div className = 'right-side'>
              <div className = 'product_name'>
                <h3>onn. 32” Class HD (720P) LED Roku Smart TV (100012589)</h3>
                <p id="product_id">Product # sklfjdk35fsdf5090</p>
              </div>

              <hr/>

              <div className='product-ratings'>
                <div className='star-outer'>
                  <div className="star-inner" ></div>
                </div>
              <span id="no_of_reviews">(5 Reviews)</span>
              </div>

              <hr/>

              <p id="product_price">$108.00</p>
              <div className="stock-counter">
                <span className="btn-minus">-</span>

                <input type="number" className="form-control count d-inline" value="1" readOnly />

                <span className="btn-plus">+</span>
              <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
              </div>


              <hr/>

              <p>Status: <span id="stock_status">In Stock</span></p>

              <hr/>

              <div className="product-description">
                <h4 >Description:</h4>
                <p>Binge on movies and TV episodes, news, sports, music and more! We insisted on 720p High Definition for this 32" LED TV, bringing out more lifelike color, texture and detail. We also partnered with Roku to bring you the best possible content with thousands of channels to choose from, conveniently presented through your own custom home screen.</p>
              </div >
                
                <hr/>

                <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>
				
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
            </div>

          </div>    

                    
        </> }
  
    </>      
  )
}
export default ProductDetails
