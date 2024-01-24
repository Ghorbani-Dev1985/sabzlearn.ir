import React from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


function useUpdate(url , updateInfos ,authorization) {
    axios.put(`${BaseURL}${url}` , updateInfos , {
      headers: {
        authorization: authorization,
      },
    })
    .then(response => {
      toast.success("ویرایش اطلاعات با موفقیت انجام گردید");
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default useUpdate
