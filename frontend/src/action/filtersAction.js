import {
  SET_PRICE,
  RESET_PRICE,
  // GET_PRICE, 
  
  // SET_CATEGORY,
  // GET_CATEGORY,
} from '../constants/filtersConstant';


export const setPrice = (minPrice, maxPrice) => {
  return {
    type: SET_PRICE,
    payload: { minPrice: minPrice,
               maxPrice: maxPrice}
  };
}
export const resetPrice = () => {
  return {
    type: RESET_PRICE,

  }
  
}

