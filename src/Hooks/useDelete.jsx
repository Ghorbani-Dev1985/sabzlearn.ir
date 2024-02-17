import React from 'react'
import toast from 'react-hot-toast';
import ApiRequest from '../Services/Axios/Config';


const useDelete = async (url ) => {
    const ResponseResult = await ApiRequest.delete(`${url}`)
    .then((ResponseResult) => {
      ResponseResult.status === 200 && toast.success("حذف با موفقیت انجام گردید") 
    })
    .catch((ResponseError) => {
      console.log(ResponseError)
      toast.success("حذف انجام نشد")
    })
}

export default useDelete
