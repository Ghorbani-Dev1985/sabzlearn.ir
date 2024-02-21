import React from "react";
import ApiRequest from "../Services/Axios/Configs/Config";
import toast from "react-hot-toast";
import { useShowRealtimeDatas } from "../Contexts/ShowRealtimeDatasContext";
import { useEditModal } from "../Contexts/EditModalContext";

const useUpdate = (url, updateInfos) => {
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const ResponseResult = ApiRequest.put(`${url}`, updateInfos)
  .then((response)=>{
    if(response.data){
      setShowRealTimeDatas((prev) => !prev);
      setShowEditModal(false)
      toast.success('ویرایش کاربر با موفقیت انجام شد')
    }
  }) 
};

export default useUpdate;
