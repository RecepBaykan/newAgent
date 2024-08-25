import React from 'react'
import { useParams } from 'react-router-dom'

const ReadNews = () => {
    
    const {id} = useParams();

    


  return (
    <>
        {id ? "" : ""}

    
    
    </>
  )
}

export default ReadNews