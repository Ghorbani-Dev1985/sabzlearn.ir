import React from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';


function useDelete(url ) {
    axios.delete(`${BaseURL}${url}` , {
      headers : {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
    .then(response => {
      if(response.status === 200){
        toast.success("حذف با موفقیت انجام گردید")
      }else{
        toast.success("حذف انجام نشد")
      }
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  
}

export default useDelete
