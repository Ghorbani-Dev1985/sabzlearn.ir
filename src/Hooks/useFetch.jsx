import React, {useState, useEffect } from 'react'
import { useShowLoading } from '../Contexts/ShowLoadingContext';
import { useShowRealtimeDatas } from '../Contexts/ShowRealtimeDatasContext';
import ApiRequest from '../Services/Axios/Config';

const useFetch = (url) => {
  const [datas , setDatas] = useState([])
  const {showRealtimeDatas} = useShowRealtimeDatas()
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  useEffect(() => {
     setIsShowLoading(true)
     const ResponseResult = ApiRequest(`${url}`)
    .then(ResponseResult => {
      setDatas(ResponseResult.data)
      setIsShowLoading(false)
    })
    } , [url , showRealtimeDatas]);
  return {datas}
}

export default useFetch
