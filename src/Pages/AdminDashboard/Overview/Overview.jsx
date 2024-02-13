import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { BaseURL } from '../../../Utils/Utils'

function Overview() {
  const Navigate = useNavigate()
  useEffect(() => {
      axios.get(`${BaseURL}auth/me` , {
        headers : {
          'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      })
      .then(response => {
        if(response.data.role !== 'ADMIN'){
          Navigate('/')
         toast.error('امکان دسترسی وجود ندارد')
        }
        console.log(response.data)
      })
      .catch(error => {
          console.log(error)
          toast.error("  خطا در اتصال به سرور ");
      })
  }, [])
  return (
    <div>
      feffییب
    </div>
  )
}

export default Overview
