import React from "react";
import ApiRequest from "../Services/Axios/Configs/Config";

const usePut = async (url, newItemInfos) => {
  console.log(url);
  const ResponseResult = await ApiRequest.put(`${url}`, newItemInfos);
};

export default usePut;
