import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { resetAllFilters } from '../../action/filtersAction';

export const Search = ({history}) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword]  = useState('')




  function handleSearch (e){
    e.preventDefault();

    dispatch(resetAllFilters());
  
    
    if(keyword){
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }


  }


  return (

      <div className="search-container">
        <div className = 'input-container'>
          <input type = 'text' id = 'search_product'
            name = 'search_product'
            placeholder="Search for Product..."
            onChange={(e)=>{setKeyword(e.target.value)}}
            />
        </div>
          <div className = 'button-container'>
              <i className = 'fas fa-search' onClick={handleSearch}> </i>
          </div>
      </div>
    


  )
}
