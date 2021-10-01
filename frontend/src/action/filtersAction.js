import {
  SET_PRICE,
  RESET_PRICE,
  SET_FILTERS,
  RESET_ALL_FILTERS,
  SET_CATEGORY,
  RESET_CATEGORY,
} from '../constants/filtersConstant';


export const setPrice = (minPrice, maxPrice) => {
  return {
    type: SET_PRICE,
    payload: { minPrice: minPrice,
               maxPrice: maxPrice}
  };
}

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: { category: category}
  };
}

export const resetAllFilters= () => {
  return {
    type: RESET_ALL_FILTERS,
  }
  
}

