import React from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


function useDelete(url , authorization) {
    axios.delete(`${BaseURL}${url}` , {
      headers: {
        authorization: authorization,
      },
    })
    .then(response => {
      toast.success("حذف با موفقیت انجام گردید");
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default useDelete
