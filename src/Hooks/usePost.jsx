import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';
import { useShowRealtimeDatas } from '../Contexts/ShowRealtimeDatasContext';
import { useShowLoading } from '../Contexts/ShowLoadingContext';


function usePost(url , newInfo , userToken) {
  const [datas , setDatas] = useState([])
  const {showRealtimeDatas} = useShowRealtimeDatas()
  const {isShowLoading , setIsShowLoading} = useShowLoading()
    useEffect(() => {
      setIsShowLoading(true)
       axios.post(`${BaseURL}${url}` , newInfo , userToken && {
       headers : {
         'Content-Type' : 'application/json',
         Authorization : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
       }
     })
     .then(response => {
       setDatas(response.data)
       setIsShowLoading(false)
     })
     .catch(error => {
         console.log(error)
         toast.error("  خطا در اتصال به سرور ");
     })
     } , [url , showRealtimeDatas]);
   return {datas}
  
}

export default usePost
