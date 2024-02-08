import React from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


function useUpdate(url , updateInfos) {
    axios.put(`${BaseURL}${url}` , updateInfos , {
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
    .then(response => {
      if(response.status === 200){
        toast.success("ویرایش اطلاعات با موفقیت انجام گردید")
      }else{
        toast.error("ویرایش اطلاعات انجام نشد")
      }
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default useUpdate
