import React from 'react';



import FilterByPrice from './productFilters/FilterByPrice';
import Product from './product/Product';


const SearchPage = ({products, filterByPrice, searchkeyword, countTotal, setPriceMax, setPriceMin}) => {


  return (
    <>
    <div className='section-spacing'>{`showing ${countTotal > 4 ? countTotal - 4 : countTotal } out of ${countTotal}  for "${searchkeyword}"`} </div>
    <div className = 'content-container'>
      <div className = 'filter-section-left'>
        <FilterByPrice setPriceMin = {setPriceMin} setPriceMax = {setPriceMax} filterByPrice = {filterByPrice}/>

      </div>
      <div className ='product-content-right'>
        {products && products.map(product => (
          <Product key = {product._id} product = {product}/>
          )) }
      </div>
    </div>
   
  </>
  )
}

export default SearchPage
