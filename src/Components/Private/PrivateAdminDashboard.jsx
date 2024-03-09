import React, { useEffect } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateAdminDashboard({children}) {
  const {isLoggedIn ,userInfos} = useAuth()
  const Navigate = useNavigate()
  console.log(isLoggedIn , userInfos.role)
  useEffect(() => {
    if(!isLoggedIn || userInfos.role === undefined){
      Navigate("/")
    }else{
      Navigate("overview")
    }
  },[isLoggedIn , userInfos.role])
  return (
    <>
      {
      userInfos.role === 'ADMIN' && <>{children}</> 
         }
    </>
  )
}

export default PrivateAdminDashboard
