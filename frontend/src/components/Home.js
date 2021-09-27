import React, {useEffect, useState} from 'react';
import Pagination  from 'react-js-pagination';

import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';

import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from '../action/productActions';


import { useAlert } from 'react-alert';


const Home = ({match}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const alert = useAlert();

  const dispatch = useDispatch();
  const {loading, products, error, countTotal, resultsPerPage} = useSelector(state=> state.products)
  const searchkeyword = match.params.keyword


  useEffect(() => {
    if(error) {
      return alert.error(error)
    }
    dispatch(getProduct(searchkeyword ,currentPage));
  }, [dispatch, alert, error, searchkeyword, currentPage])

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }

  return (
    <>
    {loading ?  <Loader/>: 
    <>
    <MetaData title = {'Best Product ever!'}/>
      <h1 id="products_heading">Latest Products</h1>
        <div className="latest-product-container">
          {products && products.map(product => (

           <Product key = {product._id} product = {product}/>

          ))}
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
