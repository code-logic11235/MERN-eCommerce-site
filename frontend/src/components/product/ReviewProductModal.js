import React from 'react'

export default function ReviewProductModal() {
  return (
<div>
<div>
                  <div className='modal-box' >
                    <div className='popup-inner'> 
                    <div className='modal-title'>
                      <h2 id="ratingModalLabel">Submit Review</h2>
                      <div className= 'close-btn' >X</div>
                    </div>
                    {/* <hr/> */}
                    <div className='rate-product'>
                      <div className='star-outer'>
                        <div className="star-inner" ></div>
                      </div>
                    </div>
                      <div className= 'form-wrapper'>
                        <form className = 'form' >

                          <div className='input-group'>
                            <input type="text" className='txt-input'
                            name = 'subject'
                            
                            
                            autoComplete="off" 
                            placeholder='Write Review...'
                            />       
                            <label htmlFor= 'subject'> New Subject</label>
                          </div>

                      
                          <input className = 'submit-btn' type="submit" value="Submit"/>
                        </form>
                      </div>
                    </div>
                  </div>
                  
                </div>
</div>
  )
}
