import React from 'react'

export const Logo = ({history}) => {
  
  return (

    <div className='logo-container' onClick = {()=>{history.push('/')}}>
      <div className='logo'>
        {/* <i className="material-icons " id= 'logo'>style</i>  */}
      </div>
      <p >LocalCommerce</p>
    </div>

  )
}
