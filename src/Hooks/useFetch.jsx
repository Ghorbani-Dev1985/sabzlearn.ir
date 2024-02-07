import React, {useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import { useShowLoading } from '../Contexts/ShowLoadingContext';
import toast from 'react-hot-toast';
import { useShowRealtimeDatas } from '../Contexts/ShowRealtimeDatasContext';

const useFetch = (url , userToken) => {
  const [datas , setDatas] = useState([])
  const {showRealtimeDatas} = useShowRealtimeDatas()
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  useEffect(() => {
     setIsShowLoading(true)
      axios.get(`${BaseURL}${url}` , userToken && {
      headers : {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
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

export default useFetch
