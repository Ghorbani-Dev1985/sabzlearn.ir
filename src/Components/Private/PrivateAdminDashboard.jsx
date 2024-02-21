import React from 'react'
import { useAuth } from '../../Contexts/AuthContext'

function PrivateAdminDashboard({children}) {
  const {userInfos} = useAuth()
  return (
    <>
      {
        userInfos.role === 'ADMIN' && <>{children}</>
         }
    </>
  )
}

export default PrivateAdminDashboard
