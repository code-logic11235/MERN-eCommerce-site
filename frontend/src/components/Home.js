import React, {useEffect, useState} from 'react';
import Pagination  from 'react-js-pagination';


import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';


import SearchPage from './SearchPage';

import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from '../action/productActions';



import { useAlert } from 'react-alert';




const Home = ({match}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1)  //for pagination

  // const [category, setCategory] = useState('');

  const alert = useAlert();



  const {loading, products, error, countTotal, resultsPerPage} = useSelector(state=> state.products) //pulling state from redux
  const searchkeyword = match.params.keyword //params from searchbar
  const {minPrice, maxPrice, category} = useSelector(state=>state.filters)

  // const {category} = useSelector(state => state.filters)
  useEffect(() => {
    if(error) {
      return alert.error(error)
    }
    console.log('>>>>>>useeffect<<<<')
    dispatch(getProduct(searchkeyword, currentPage, minPrice, maxPrice, category));
  }, [ alert, error, searchkeyword, currentPage])

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }


  return (
    <>
    {loading ?  <Loader/>: 
    <>
    <MetaData title = {'Best Product ever!'}/>
      {searchkeyword? (
          <SearchPage products = {products} 
          searchkeyword = {searchkeyword} 
          countTotal={countTotal}
          currentPage = {currentPage} 
          

          />
        ): (
          <>
            <h1 id="products_heading">Latest Products</h1>
            <div className="latest-product-container"> 
              {
                products && products.map(product => (
                  <Product key = {product._id} product = {product}/>
                )) 
              }
            </div>
          </>
            
        )}



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
