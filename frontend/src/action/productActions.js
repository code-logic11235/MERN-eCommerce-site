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

export const getProduct = (searchkeyword = '', currentPage=1, minPrice, maxPrice, category, rating) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST
    })

    console.log('-------------')
    // console.log('searchkeyword: ', searchkeyword)
    // console.log('currentPage: ', currentPage)
    // console.log('minPrice: ', minPrice)
    // console.log('maxPrice: ', maxPrice)
    // console.log('category: ', category)
    console.log('rating lol ',rating)
    console.log('-------------')

    let link = `/api/v1/products?keyword=${searchkeyword}&page=${currentPage}`;

    let minPriceLink = `&price[gte]=${minPrice}`;
    let maxPriceLink = `&price[lte]=${maxPrice}`;
    let categoryLink = `&category=${category}`;
    let ratingsLink = `&ratings[gte]=${rating}`;
    
    if(minPrice){
      link = link.concat(minPriceLink);
      // console.log(link)
    } 
    if(maxPrice) {
      link = link.concat(maxPriceLink);
    } 
    // console.log(link)
    if(category) {
      link = link.concat(categoryLink);
    }
    if(rating){
      link = link.concat(ratingsLink);
    }
    console.log(link)
    
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