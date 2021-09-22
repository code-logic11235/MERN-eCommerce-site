import React, {useEffect} from 'react';

import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';

import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from '../action/productActions';
import {hideModal} from '../action/modalActions';

import { useAlert } from 'react-alert';


const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const {loading, products, error, productsCount} = useSelector(state=> state.products)

  useEffect(() => {
    if(error) {
      return alert.error(error)
    }
    dispatch(getProduct());
    // dispatch(hideModal());
  }, [dispatch, alert, error])

  return (
    <>
    {loading ?  <Loader/>: 
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
