import {
  SET_PRICE,
  SET_FILTERS,
  RESET_ALL_FILTERS,
  SET_CATEGORY,

} from '../constants/filtersConstant';

const initState = {
  minPrice: '',
  maxPrice: '',
  category: ''
}
export const FilterReducer = ( state = initState, action) => {
  switch(action.type) {
   

    case SET_PRICE: 
      return {
        ...state,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice
      }
      
    case SET_CATEGORY: 
      return {
        ...state,
        category: action.payload.category,
      }

    case RESET_ALL_FILTERS: 
      return {
        minPrice: '',
        maxPrice: '',
        category: ''
      }
  
     
    default: 
      return state;
  }
}
