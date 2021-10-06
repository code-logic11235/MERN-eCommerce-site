import React from 'react';
import { Search } from './Search';
import { Route , Link} from 'react-router-dom';
import { Logo } from './Logo';
import { showModal, hideModal } from '../../action/modalActions';
import LoginHoverModal from '../user/LoginHoverModal';

import {useDispatch, useSelector} from 'react-redux';
const Header = () => {
  const dispatch = useDispatch();
  const {modal} = useSelector(state=> state.modal);

  function hide(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if(e.target === e.currentTarget){
      dispatch(hideModal());
    }
  }
  return (
    <div className = 'navbar'>

    
      <div className = 'navbar-container'>

        <Route render={({history})=><Logo history ={history}/>}/>
        <Route render={({history})=><Search history ={history}/>}/>

        <div className='nav-tools'>
          
          <Link to = '/login'className= 'nav-sign-in' onMouseOver= {()=>{ setTimeout(()=>{dispatch(showModal());},500 ) }}> Hello, Sign in 
            <br/>
            <span id='your-account'> Your Account</span> 
            <span className= 'nav-arrow'> </span>
          </Link>
            <i className='fas fa-shopping-cart'> 2 </i>
            {modal ? <LoginHoverModal hideModal = {hide}/> : null}
        </div>
      </div>
    </div>
    
  )

}

export default Header
