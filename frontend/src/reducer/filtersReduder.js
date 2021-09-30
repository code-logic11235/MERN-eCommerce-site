import {
  SET_PRICE,
  RESET_PRICE, 
  // GET_PRICE, 
  // SET_CATEGORY,
  // GET_CATEGORY,
} from '../constants/filtersConstant';

const initState = {
  minPrice: '',
  maxPrice: ''
}
export const FilterReducer = ( state = initState, action) => {
  switch(action.type) {
    
    case SET_PRICE: 
      return {

        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice
      }
      case RESET_PRICE: 
      return {
        minPrice: '',
        maxPrice: ''
      }
  
     
    default: 
      return state;
  }
}
