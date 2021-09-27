import React from 'react';
import { Search } from './Search';
import { Route } from 'react-router-dom';
import { Logo } from './Logo';

const Header = () => {
  return (
    <div className = 'navbar'>

    
      <div className = 'navbar-container'>

        <Route render={({history})=><Logo history ={history}/>}/>
        <Route render={({history})=><Search history ={history}/>}/>

        <div className='nav-tools'>
          
          <div className= 'nav-sign-in'> Hello, Sign in 
            <br/>
            <span id='your-account'> Your Account</span> 
          </div>
            <i className='fas fa-shopping-cart'> 2 </i>
        </div>
      </div>
    </div>
    
  )

}

export default Header
