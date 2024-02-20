import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ApiRequest = axios.create({
  baseURL: "http://localhost:5000/v1/",
});

ApiRequest.interceptors.request.use(
  (config) => {
    const getToken = JSON.parse(localStorage.getItem("user"));
    if (getToken !== null) {
      console.log("f");
      config.headers.Authorization = `Bearer ${getToken.token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiRequest.interceptors.response.use(
  (response) => {
    if (
      (response.status === 200 || response.status === 201) &&
      response.data.length === 0
    ) {
      toast.success(" درخواست شما با موفقیت انجام شد");
    }
    return response;
  },
  (error) => {
    const status = error.response.status;
    if (status === 408) {
      toast.error("دسترسی غیر مجاز");
      useNavigate("/login");
    } else if (status === 400) {
      toast.error("  کد تخفیف معتبر نمی باشد");
    } else if (error.response.status === 409) {
      toast.error("  استفاده از کد تخفیف به اتمام رسیده است");
    } else if (error.response.status === 403) {
      toast.error("این شماره همراه مسدود شده است");
    } else if (error.response.status === 405) {
      toast.error("با این ایمیل قبلا ثبت نام شده است");
    } else if (error.response.status === 401) {
      toast.error("  کاربری با چنین مشخصات یافت نگردید");
    } else {
      toast.error("خطا در اجرای درخواست");
    }

    return Promise.reject(error);
  }
);

export default ApiRequest;
