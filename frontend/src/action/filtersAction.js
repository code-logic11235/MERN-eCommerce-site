import {
  SET_PRICE,
  SET_CATEGORY,
  SET_RATING,
  RESET_ALL_FILTERS,

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

export const setRating = (rating) => {
  return {
    type: SET_RATING,
    payload: { rating: rating}
  };
}


export const resetAllFilters= () => {
  return {
    type: RESET_ALL_FILTERS,
  }
  
}

