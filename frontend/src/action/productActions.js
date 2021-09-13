import axios from 'axios';

import {
  ALL_PRODUCTS_REQUEST, 
  ALL_PRODUCTS_SUCCESS, 
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants';

export const getProduct = () => async (dispatch) => {
  try {
    
  }catch (error) {
    dispatch ({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}