import React, { useEffect } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function PrivateAdminDashboard({children}) {
    const {userInfos } = useAuth()
    const Navigate = useNavigate()
    
    useEffect(() => {
       console.log(userInfos)
    //   if(!userInfos.length) {
    //     Navigate('/')
    //   }else{
    //     Navigate('overview')
    //   }
   } , [])
     console.log(userInfos)
  return (
    <>
      {
        userInfos.role === 'ADMIN' && <>{children}</>
      }
    </>
  )
}

export default PrivateAdminDashboard
