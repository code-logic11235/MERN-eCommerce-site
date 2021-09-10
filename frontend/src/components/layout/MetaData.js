import React from 'react'
import {Helmet} from 'react-helmet'
const MetaData = ({title}) => {
  return (
    <Helmet>
      <title> {`Local Commerce. ${title}`}</title>
    </Helmet>
  )
}

export default MetaData
