import React from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


function useInsert(url , newItemInfos , headers ) {
    axios.post(`${BaseURL}${url}` , newItemInfos , headers ? {
      headers : {
        'Content-Type' : 'application/json'
      }
    } : "")
    .then(response => {
      console.log(response)
      toast.success("ثبت اطلاعات با موفقیت انجام گردید")
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default useInsert
