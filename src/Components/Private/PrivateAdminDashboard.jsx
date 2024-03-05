import React, { useEffect } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import ApiRequest from '../../Services/Axios/Configs/Config'
import { useNavigate } from 'react-router-dom'

function PrivateAdminDashboard({children}) {
 // const {userInfos} = useAuth()
   
   const Navigate = useNavigate()
    const abortController = new AbortController()
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    if(localStorageData){
      const ResponseResult = ApiRequest('auth/me' , {signal: abortController.signal})
      .then((response) => {
         if(response.data.role !== 'ADMIN'){
          console.log("no")
          Navigate('/')
          return
         }
      });
    }else{
      Navigate('/')
    }
    return () => {
      abortController.abort()
    }
  }, [])
  return (
    <>
    {children}
      {/* {
        userInfos.role === 'ADMIN' && <>{children}</>
         } */}
    </>
  )
}

export default PrivateAdminDashboard
