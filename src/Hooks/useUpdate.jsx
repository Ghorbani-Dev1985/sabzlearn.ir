import React from 'react'
import ApiRequest from '../Services/Axios/Config';


const useUpdate = async (url , updateInfos) => {
  const ResponseResult = await ApiRequest.put(`${url}` , updateInfos)
}

export default useUpdate
