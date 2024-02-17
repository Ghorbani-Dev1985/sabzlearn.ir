import React from "react";
import ApiRequest from "../Services/Axios/Configs/Config";

const useUpdate = async (url, updateInfos) => {
  const ResponseResult = await ApiRequest.put(`${url}`, updateInfos);
};

export default useUpdate;
