import { Email, Person, PhoneIphone, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Button from "../../common/Form/Button";
import useTitle from "../../Hooks/useTitle";
import toast from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import ApiRequest from "../../Services/Axios/Configs/Config";


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const title = useTitle(" ثبت نام");
  const { LoginHandler} = useAuth()
  const Navigate = useNavigate()
  const [isGoogleRecaptchaVerify , setIsGoogleRecaptchaVerify] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    isDirty,
    isValid,
    watch,
    formState,
  } = useForm(
    {
      mode: "all",
    },
    {
      defaultValues: {
        FullName: "",
        UserName: "",
        MobilNumber: "",
        Email: "",
        Password: '',
        ConfirmPassword: '',
      },
    }
  );
  const [password, setPassword] = useState("");
  const registerNewUserHandler = (data) => {
    
        const newUserInfos = {
          name: data.FullName,
          username: data.UserName,
          phone: data.MobilNumber,
          email: data.Email,
          password: data.Password,
          confirmPassword: data.ConfirmPassword
        }
        const ResponseResult = ApiRequest.post("auth/register", newUserInfos)
          .then(response => {
            console.log(response.data)
            if(response.data){
              LoginHandler(response.data.user , response.data.accessToken)
              toast.success("ثبت نام با موفقیت انجام گردید")
              Navigate('/' , {replace: true})
            }
          })
          
        
  }
  const RecaptchaChangeHandler = () => {
    setIsGoogleRecaptchaVerify(true)
   }
  return (
    <>
      <LoginRegisterTemplate subLink={ <p className="mt-4 sm:mt-6 font-danaLight sm:text-lg text-center text-slate-500 dark:text-gray-500">
             <span>با عضویت در سایت، تمامی  </span> 
              <Link to="/termsConditions" className="text-primary hover:text-green-500 transition-colors"> قوانین و شرایط </Link>
                 <span>استفاده از خدمت سبزلرن را پذیرفته اید. </span>
            </p>}>

      <div className="text-center mb-7 sm:mb-9">
        <h2 className="font-MorabbaBold text-zinc-700 dark:text-white text-3xl mb-2 sm:mb-3">
          عضویت
        </h2>
        <span className="help-alert font-danaLight text-lg text-slate-500 dark:text-gray-500">
          قبلا ثبت نام کرده‌اید؟
          <Link
            to="/login"
            className="text-primary hover:text-green-500 transition-colors"
            >
            وارد شوید
          </Link>
        </span>
      </div>
      {/* Inputs */}
      <form onSubmit={handleSubmit(registerNewUserHandler)}>
        <div className="space-y-2.5 sm:space-y-3.5">
          {/* FullName */}
        <div className="relative">
              <input
                {...register("FullName", {
                  required: "وارد کردن نام و نام خانوادگی اجباری می باشد",
                  minLength: {
                    value: 5,
                    message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 15,
                    message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /^[\u0600-\u06FF\s]+$/g,
                    message: "لطفا فقط حروف فارسی وارد نمایید",
                  },
                })}
                className={`${
                  errors.FullName && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder=" نام و نام خانوادگی*"
              />
              <Person className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.FullName && errors.FullName.message}
            </span>
                {/* MobileNumber */}
               <div className="relative">
              <input
                type="tel"
                {...register("MobilNumber", {
                  required: "وارد کردن تلفن تماس اجباری می باشد",
                  minLength: {
                    value: 10,
                    message: "لطفا حداقل ۱۰ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 11,
                    message: "لطفا حداکثر ۱۱ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                    message: "لطفا فقط عدد انگلیسی وارد نمایید",
                  },
                })}
                className={`${
                  errors.MobilNumber && "border border-rose-500"
                } outline-none pl-9 sm:pl-12 placeholder:text-right`}
                placeholder=" *تلفن تماس"
              />
              <PhoneIphone className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.MobilNumber && errors.MobilNumber.message}
            </span>
          {/* Email */}
          <div className="relative">
              <input
                type="text"
                {...register("Email", {
                  required: "وارد کردن ایمیل اجباری می باشد",
                  minLength: {
                    value: 5,
                    message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 30,
                    message: "لطفا حداکثر ۲۰ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g,
                    message: "لطفا ایمیل صحیح وارد نمایید",
                  },
                })}
                className={`${
                  errors.Email && "border border-rose-500"
                } outline-none pl-9 sm:pl-12 dir-ltr placeholder:text-right`}
                placeholder="  *ایمیل"
              />
              <Email className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.Email && errors.Email.message}
            </span>
             {/* UserName */}
             <div className="relative">
              <input
                {...register("UserName", {
                  required: "وارد کردن نام کاربری اجباری می باشد",
                  minLength: {
                    value: 8,
                    message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 15,
                    message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]{8,15}$/g,
                    message: "نام کاربری معتبر نمی باشد کاراکترهای (a-zA-Z0-9_-) مجاز می باشند",
                  },
                })}
                className={`${
                  errors.UserName && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder=" نام کاربری*"
              />
              <Person className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.UserName && errors.UserName.message}
            </span>
              {/* Password */}
       <div className="relative">
              <input
                {...register("Password", {
                  required: "وارد کردن کلمه عبور اجباری می باشد",
                  minLength: {
                    value: 8,
                    message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 15,
                    message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /^^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
                    message: "کلمه عبور  باید شامل حروف بزرگ و کوچک و عدد و کاراکتر باشد",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className={`${
                  errors.Password && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder="  کلمه عبور*"
              />
               <Visibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="left-3 sm:left-4 cursor-pointer"
                />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.Password && errors.Password.message}
            </span>
              {/* Password */}
       <div className="relative">
              <input
                {...register("ConfirmPassword", {
                  required: "وارد کردن تکرار کلمه عبور اجباری می باشد",
                  minLength: {
                    value: 8,
                    message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 15,
                    message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
                    message: "کلمه عبور معتبر نمی باشد ",
                  },
                  validate: (val) => {
                     if(watch('Password') != val){
                      return "کلمه عبور با تکرار کلمه عبور مطابقت ندارد"
                     }
                  }
                })}
                type={showPassword ? "text" : "password"}
                className={`${
                  errors.Password && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder="  کلمه عبور*"
              />
               <Visibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="left-3 sm:left-4 cursor-pointer"
                />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.ConfirmPassword && errors.ConfirmPassword.message}
            </span>
             <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={RecaptchaChangeHandler} />
        </div>
        <Button btnType="submit"  className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={(!formState.isValid || !isGoogleRecaptchaVerify)}>ادامه</Button>
      </form>
              </LoginRegisterTemplate>
    </>
  );
}

export default Register;
