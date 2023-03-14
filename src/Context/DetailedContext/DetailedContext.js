import React, { createContext, useState } from 'react'
import { useContext } from 'react'


export const Details = createContext('');

function DetailedContext({children}) {
    
    const [detailViewId, setDetailViewId] = useState("");
    
  return (
    <Details.Provider value={{detailViewId, setDetailViewId}}>
        {children}
    </Details.Provider>
  )
}

export default DetailedContext