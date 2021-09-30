import axios from 'axios';

import {
  ALL_PRODUCTS_REQUEST, 
  ALL_PRODUCTS_SUCCESS, 
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';

export const getProduct = (searchkeyword = '', currentPage=1, minPrice, maxPrice, category) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST
    })


    let link = `/api/v1/products?keyword=${searchkeyword}&page=${currentPage}`
    if(minPrice && maxPrice) {
      link = `/api/v1/products?keyword=${searchkeyword}&page=${currentPage}&price[lte]=${maxPrice}&price[gte]=${minPrice}`
    }
    if(minPrice && !maxPrice  ) {
      link = `/api/v1/products?keyword=${searchkeyword}&page=${currentPage}&price[gte]=${minPrice}`
    }
    if(maxPrice && !minPrice){
      link = `/api/v1/products?keyword=${searchkeyword}&page=${currentPage}&price[lte]=${maxPrice}`
    }

    if(category){
      link = `/api/v1/products?keyword=${searchkeyword}&page=${currentPage}&price[lte]=${maxPrice}&price[gte]=${minPrice}&category=${category}`
    }
    const {data} = await axios.get(link);
    
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    })
    
  }catch (error) {
    dispatch ({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}


export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    })
    // console.log(data)
    const {data} = await axios.get(`/api/v1/product/${id}`);
    
    // console.log(data)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    })
    
  }catch (error) {
    dispatch ({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}

//Clear error 

export const clearErrors = () => async (dispatch) =>{
  dispatch({
    type: CLEAR_ERRORS
  })
}