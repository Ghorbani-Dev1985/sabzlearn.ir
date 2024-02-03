import React from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


function useInsert(url , newItemInfos , headers , newComment) {
    axios.post(`${BaseURL}${url}` , newItemInfos , headers ? {
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    } : "")
    .then(response => {
      console.log(response)
      newComment ? toast.success("نظر شما پس از تایید نمایش داده خواهد شد") : toast.success("ثبت اطلاعات با موفقیت انجام گردید")
      
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default useInsert
