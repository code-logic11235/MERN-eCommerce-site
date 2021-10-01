import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import { setPrice } from '../../action/filtersAction';
import { getProduct } from '../../action/productActions';

const FilterByPrice = ({searchkeyword, currentPage}) => {
  const dispatch = useDispatch();
  const {category} = useSelector(state=>state.filters)

  let minPrice = '';
  let maxPrice = ''
  
  function onGoPressed (){
    dispatch(setPrice(minPrice,maxPrice));

    dispatch(getProduct(searchkeyword, currentPage, minPrice, maxPrice, category));

  }

  return (
    <div className = 'filter-price'>
      Price
      <form onSubmit = {onGoPressed}>
        <div className = 'price-range low-price '> 
          <span>$</span>
          <input 
            type= 'text' 
            placeholder= 'Min' 
            onChange = {(e)=>{
                minPrice = e.target.value;
            }}
          />

        </div>
        <div className = 'price-range high-price'> 
          <span>$</span>
          <input 
            type= 'text' 
            placeholder= 'Max'
            onChange = {(e)=>{
              maxPrice = e.target.value;
          }}
          />
        </div>
        <button>Go</button>
      </form>
    </div>
  )
}

export default FilterByPrice
