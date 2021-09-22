
import {
  MODAL_SHOW,
  MODAL_HIDE
  } from '../constants/modalConstant';

const initialState = {
  modal: false
}
  
export const modalReducer = ( state = initialState, action) => {
  switch(action.type) {
    
    case MODAL_SHOW: 
      return {
        ...state,
        modal: true
      }
      case MODAL_HIDE: 
      return {
        ...state,
        modal: false
      }

    default: 
      return state;
  }
}