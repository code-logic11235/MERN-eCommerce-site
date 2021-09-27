import React, {useEffect, useState} from 'react';
import Pagination  from 'react-js-pagination';


import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';

import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from '../action/productActions';


import { useAlert } from 'react-alert';



const Home = ({match}) => {

  const [currentPage, setCurrentPage] = useState(1)  //for pagination

  const [priceMin, setPriceMin] = useState(1); //for price filter
  const [priceMax, setPriceMax] = useState(1000); //for price filter
  const alert = useAlert();

  const dispatch = useDispatch();

  const {loading, products, error, countTotal, resultsPerPage} = useSelector(state=> state.products) //pulling state from redux
  const searchkeyword = match.params.keyword //params from searchbar

  

  useEffect(() => {
    if(error) {
      return alert.error(error)
    }
    dispatch(getProduct(searchkeyword ,currentPage, priceMin, priceMax));  
  }, [dispatch, alert, error, searchkeyword, currentPage])

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }
  function filterByPrice(){
    dispatch(getProduct(searchkeyword ,currentPage, priceMin, priceMax));  
  }
  return (
    <>
    {loading ?  <Loader/>: 
    <>
    <MetaData title = {'Best Product ever!'}/>
      <h1 id="products_heading">Latest Products</h1>
  
        <div className="latest-product-container">
        {searchkeyword? (
            <>
              <div className = 'filter-product'>
                <div className = 'filter-price'>
                  <form onSubmit = {filterByPrice}>
                    <div className = 'price-range low-price '> 
                      <span>$</span>
                      <input 
                        type= 'text' 
                        placeholder= 'Min' 
                        onChange = {(e)=>{
                            setPriceMin(e.target.value)
                        }}
                      />

                    </div>
                    <div className = 'price-range high-price'> 
                      <span>$</span>
                      <input 
                        type= 'text' 
                        placeholder= 'Max'
                        onChange = {(e)=>{
                          setPriceMax(e.target.value)
                      }}
                      />
                    </div>
                    <button>Go</button>
                  </form>
                </div>
              </div>
              <div >
                  {/* //products after slider */}
                  {products && products.map(product => (
              <Product key = {product._id} product = {product}/>
             )) }
              </div>
            </>
          ): (
            products && products.map(product => (
              <Product key = {product._id} product = {product}/>
             )) 
          )}

        </div>
 
        {/* <div className = 'pagination'> */}
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultsPerPage}
              totalItemsCount={countTotal}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={'First'}
              lastPageText={'last'}
              itemClass='page-item'
              linkClass='page-link'
            />
        {/* </div> */}


    </> 
    }
    </>
  )
}

export default Home
