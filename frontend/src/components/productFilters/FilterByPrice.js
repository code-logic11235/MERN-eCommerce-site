import React from 'react'

const FilterByPrice = ({setPriceMin,setPriceMax,filterByPrice}) => {


  return (
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
  )
}

export default FilterByPrice
