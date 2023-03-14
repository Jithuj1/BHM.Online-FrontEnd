import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./User.css"

function User() {
    const navigate = useNavigate()
  return (
    <div>
        <div style={{height:"100vh", width:"100vw", backgroundColor:"rgb(208, 186, 186)"}} className="user1">
            <div className='usersub1' onClick={()=>navigate("/admin")}>Administrator</div>
            <div className='usersub1' onClick={()=>navigate("/doctor_login")}>Doctor</div>
            <div className='usersub1' onClick={()=>navigate("/patient_login")}>Patient</div>
        </div>
    </div>
  )
}

export default User