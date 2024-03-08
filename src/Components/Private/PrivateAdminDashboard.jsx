import React from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateAdminDashboard({children}) {
  const {isLoggedIn ,userInfos} = useAuth()
  const Navigate = useNavigate()
  console.log(isLoggedIn , userInfos.role)
  if(userInfos.role !== 'ADMIN') Navigate("/")
  return (
    <>
      {
      userInfos.role === 'ADMIN' && <>{children}</> 
         }
    </>
  )
}

export default PrivateAdminDashboard
