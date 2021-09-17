import React, {useEffect} from 'react';

import MetaData from './layout/MetaData';
import Product from './product/Product';

import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from '../action/productActions';



const Home = () => {

  const dispatch = useDispatch();

  const {loading, products, error, productsCount} = useSelector(state=> state.products)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  return (
    <>
    {loading? <h1> LOADING....</h1>: 
    <>
    <MetaData title = {'Best Product ever!'}/>
      <h1 id="products_heading">Latest Products</h1>
      

        <div className="latest-product-container">
          {products && products.map(product => (

           <Product key = {product._id} product = {product}/>

          ))}

        </div>
 


    </> 
    }
    </>
  )
}

export default Home
