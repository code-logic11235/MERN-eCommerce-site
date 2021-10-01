import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setRating } from '../../action/filtersAction';
import { getProduct } from '../../action/productActions';

const FilterByRating = ({currentPage, searchkeyword} ) => {
  const dispatch = useDispatch();

  const {minPrice, maxPrice, category, rating} = useSelector(state=>state.filters)



  function handleClick(e){
    dispatch(setRating(e.target.dataset.value));
    console.log('handleclick rating',rating)
    dispatch(getProduct(searchkeyword, currentPage, minPrice, maxPrice, category,rating ));
  }
  return (
    <div className = 'filter-ratings'>
      <h4> Categories</h4>
      <ul>
        {[4,3,2,1].map(star => (
          <li key = {star} onClick= {(e)=>{handleClick(e)}} className = 'star' data-value={star} >
            <div className='filter-star-outer'>

              <div className="star-inner" style = {{width: `${star*20}%`}}> </div>
            </div>
            <span> & up</span>
          </li>
        ))

        }
      </ul>
    </div>
  )
}

export default FilterByRating
