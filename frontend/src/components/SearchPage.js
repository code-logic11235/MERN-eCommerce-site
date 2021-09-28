import React, {useState} from 'react'
import FilterByPrice from './productFilters/FilterByPrice';
import Product from './product/Product';

const SearchPage = ({products,filterByPrice}) => {

  const [priceMin, setPriceMin] = useState(1); //for price filter
  const [priceMax, setPriceMax] = useState(1000); //for price filter
  return (
    <>
    <div className = 'filter-product'>
      <FilterByPrice setPriceMin = {setPriceMin} setPriceMax ={setPriceMax} filterByPrice = {filterByPrice} />
    </div>
  <>

        {products && products.map(product => (
    <Product key = {product._id} product = {product}/>
   )) }
    </>
  </>
  )
}

export default SearchPage
