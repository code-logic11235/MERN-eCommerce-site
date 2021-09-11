import {
  ALL_PRODUCTS_REQUEST, 
  ALL_PRODUCTS_SUCCESS, 
  ALL_PRODUCTS_FAIL
} from '../constants/productConstants'

export const productsReducer = (
    state = {
      products: []
    },
    action => {
      switch(action.type) {
        
        case ALL_PRODUCTS_REQUEST: 
          return {
            loading: true,
            products: []
          }


        default: return state;
      }
    })