import React from 'react'

const FilterByCategory = ({setCategory}) => {
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
    <div >
      <h4> Categories</h4>
      <ul>
        {categories.map(category => (
          <li key = {category} onClick= {()=>{setCategory(category)}}>
            {category}
          </li>
        ))

        }
      </ul>
    </div>
  )
}

export default FilterByCategory
