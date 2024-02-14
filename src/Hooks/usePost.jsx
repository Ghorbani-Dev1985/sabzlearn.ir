import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import toast from 'react-hot-toast';
import { useShowRealtimeDatas } from '../Contexts/ShowRealtimeDatasContext';
import { useShowLoading } from '../Contexts/ShowLoadingContext';


function usePost(url , newItemInfos , tostText) {
  axios.post(`${BaseURL}${url}` , newItemInfos , {
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })
  .then(response => {
    console.log(response)
    if(response.status === 201 || response.status === 200){
      toast.success(tostText ? tostText : " افزودن با موفقیت انجام شد") 
    }else{
      toast.error("افزودن انجام نشد");
    }
  })
  .catch(error => {
      console.log(error)
      toast.error("  خطا در اتصال به سرور ");
  })
}

export default usePost
