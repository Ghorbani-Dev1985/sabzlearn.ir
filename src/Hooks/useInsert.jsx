import React from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


function useInsert(url , newItemInfos) {
    axios.post(`${BaseURL}${url}` , newItemInfos )
    .then(response => {
      toast.success("ثبت اطلاعات با موفقیت انجام گردید");
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default useInsert
