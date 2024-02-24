import React from "react";
import toast from "react-hot-toast";
import ApiRequest from "../Services/Axios/Configs/Config";

const useDelete = (url) => {
  const ResponseResult = ApiRequest.delete(`${url}`)
  .then(
    (ResponseResult) => {
      ResponseResult.status === 200 &&
        toast.success("حذف با موفقیت انجام گردید");
    }
  );
};

export default useDelete;
