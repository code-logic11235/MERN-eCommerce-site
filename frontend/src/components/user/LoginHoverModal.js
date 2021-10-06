import React from 'react'

const LoginHoverModal = ({hideModal}) => {
  return (
    <div className = 'modal-popup-box' onMouseOver= {(e)=>{hideModal(e)}}>
      <div className = 'modal-popup-signin'>
        <button> Sign in</button>
        {/* <hr/>  */}

      </div>

    </div>
  )
}

export default LoginHoverModal
