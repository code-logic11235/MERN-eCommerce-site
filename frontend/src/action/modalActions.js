
import {
MODAL_SHOW,
MODAL_HIDE
} from '../constants/modalConstant';

export const showModal =  ()=>{
  return {
    type: MODAL_SHOW,
  };
}

export const hideModal =  ()=>{
  return {
    type: MODAL_HIDE
  };
}