import { createContext, useRef, useState } from "react";
import React from 'react'

export const Random = createContext();

function RandomNum({children}) {

    let randomNUmberRef = useRef();

    let [randomNumber, setRandomNumber] = useState(9999);
  return (
    <Random.Provider value={{randomNUmberRef}}>
            {children}
    </Random.Provider>
  )
}

export default RandomNum