import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {  hideModal } from '../../action/modalActions';


export default function ReviewProductModal() {

  const dispatch = useDispatch();

  function closeModal(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if(e.target === e.currentTarget){
      dispatch(hideModal());
    }
  }
  return (
      <div>
        <div className='modal-box' onClick={(e)=>{closeModal(e)}}>
          <div className='popup-inner' > 
            <div className='modal-title'>
              <h2 id="ratingModalLabel">Submit Review</h2>
              <div className= 'close-btn' onClick= {()=>{dispatch(hideModal())}}>X</div>
            </div>
            <hr id = 'modal-hr'/>

            <div className='rate-product'>
              <div className='star-outer'>
                <div className="star-inner" ></div>
              </div>
            </div>
          
            <div className= 'form-wrapper'>
              <form className = 'form' >
                <textarea  value="Write something.." readOnly> </textarea>
              </form>
              <input className = 'submit-btn' type="submit" value="Submit"/>
            </div>
          </div>
        </div>
                    
                  
      </div>
  )
}
