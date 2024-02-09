import React, { useCallback } from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


const usePut = (url , newItemInfos ) => {
    axios.put(`${BaseURL}${url}` , newItemInfos , {
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
    .then(response => {
      console.log(response)
      if(response.status === 200){
        
        toast.success("  درخواست شما با موفقیت انجام شد");
      }else{
        toast.error("درخواست شما انجام نشد");
      }
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default usePut
