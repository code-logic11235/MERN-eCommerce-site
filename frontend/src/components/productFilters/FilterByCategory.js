import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import { setCategory } from '../../action/filtersAction';
import { getProduct } from '../../action/productActions';



const FilterByCategory = ({searchkeyword,currentPage}) => {
  const dispatch = useDispatch();
  
  const {minPrice, maxPrice} = useSelector(state=> state.filters)
  function handleClick (category){
    dispatch(setCategory(category));
    dispatch(getProduct(searchkeyword, currentPage, minPrice, maxPrice, category))
  }
  const categories = [
    'Electronics', 
    'Cameras', 
    'Laptops', 
    'Accessories', 
    'Headphones',
    'Food', 
    'Books', 
    'Cloths/Shoes', 
    'Beauty/Health', 
    'Sports', 
    'Outdoor'
  ];
  return (
    <div className = 'filter-categories'>
      <h4> Categories</h4>
      <ul>
        {categories.map(category => (
          <li key = {category} onClick= {()=>{handleClick(category)}}>
            {category}
          </li>
        ))

        }
      </ul>
    </div>
  )
}

export default FilterByCategory
