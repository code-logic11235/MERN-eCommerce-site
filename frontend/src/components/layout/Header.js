import React from 'react';

const Header = () => {
  return (
    <div className = 'navbar'>

      <div className='logo-container'>
        <div className='logo'>
          {/* <i className="material-icons " id= 'logo'>style</i>  */}
        </div>
        <h1 >LocalCommerce</h1>
      </div>

    
    <div className="search-container">
        <div className = 'input-container'>

          <input type = 'text' id = 'search_product'
            name = 'search_product'
            placeholder="Search for Product..."/>
        </div>

        <div className = 'button-container'>
            <i className = 'fas fa-search'> </i>
        </div>
      </div>
    <div className='nav-tools'>
      
      <div className= 'nav-sign-in'> Hello, Sign in 
      <br/>
      <span id='your-account'> Your Account</span> </div>
      <i className='fas fa-shopping-cart'> 2 </i>
    </div>
    </div>
  )

  // return (
  //   //if its smaller than md(768px) it will take up the 12 blocks
  //   //if its bigger than md 768px it will take up 3 blocks
  //   //mt and mb stands for margin top and margin bottom
  //   <>
  //     <nav className="navbar row">
  //       <div className="col-12 col-md-3"> 
  //         <div className="navbar-brand">
  //           {/* <img src="./images/logo.png" / */}
  //           E-commerce
  //         </div>
  //       </div>

  //       <div className="col-12 col-md-6 mt-2 mt-md-12">
  //         <div className="input-group">
            // <input
            //   type="text"
            //   id="search_field"
            //   className="form-control"
            //   placeholder="Enter Product Name ..."
            // />
  //           <div className="input-group-append">
  //             <button id="search_btn" className="btn">
  //               <i className="fa fa-search" aria-hidden="true"></i>
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
  //         <button className="btn" id="login_btn">Login</button>

  //         <span id="cart" className="ml-3">Cart</span>
  //         <span className="ml-2" id="cart_count">2</span>
  //       </div>
  //     </nav>
  //   </>
  // )
}

export default Header
