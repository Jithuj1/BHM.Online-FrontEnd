import React, { createContext, useState } from 'react'

export const Doctor = createContext();

function DoctorContext({children}) {
    
    const [doctorDetails, setDoctorDetails] = useState();
    
  return (
    <Doctor.Provider value={{doctorDetails, setDoctorDetails}}>
        {children}
    </Doctor.Provider>
  )
}

export default DoctorContext