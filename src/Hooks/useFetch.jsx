import React, { useState, useEffect } from "react";
import { useShowLoading } from "../Contexts/ShowLoadingContext";
import { useShowRealtimeDatas } from "../Contexts/ShowRealtimeDatasContext";
import ApiRequest from "../Services/Axios/Configs/Config";

const useFetch = (url) => {
  const [datas, setDatas] = useState([]);
  const { showRealtimeDatas } = useShowRealtimeDatas();
  const { isShowLoading, setIsShowLoading } = useShowLoading();
  const abortController = new AbortController()
  useEffect(() => {
    setIsShowLoading(true);
    const ResponseResult = ApiRequest(`${url}` , {signal: abortController.signal})
    .then((ResponseResult) => {
      setDatas(ResponseResult.data);
      setIsShowLoading(false);
    });
    return () => {
      abortController.abort()
    }
  }, [url, showRealtimeDatas]);
  return { datas };
};

export default useFetch;
