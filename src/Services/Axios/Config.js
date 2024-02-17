import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navigate = useNavigate()

const ApiRequest = axios.create({
    baseURL: 'http://localhost:5000/v1/',
    headers: {
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
})

ApiRequest.interceptors.request.use(
    (config) => {return config},
    (error) => {return Promise.reject(error)}
    )

ApiRequest.interceptors.response.use(
    (response => {return response}),
    (error) => {
        const status = error.response.status
        if(status === 403){
            toast.error('دسترسی غیر مجاز')
            Navigate('/login')
        }else if(status === 404){
            toast.error("  کد تخفیف معتبر نمی باشد")
        }else if(error.response.status === 409){
            toast.error("  استفاده از کد تخفیف به اتمام رسیده است")
          }else{
            toast.error('خطا در اجرای درخواست')
          }

        return Promise.reject(error)
    }
)

export default ApiRequest