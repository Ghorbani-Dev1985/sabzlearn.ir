import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { Person, Visibility } from "@mui/icons-material";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Button from "../../common/Form/Button";
import toast from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import ApiRequest from "../../Services/Axios/Configs/Config";


function Login() {
  const title = useTitle("ورود به حساب");
  const { LoginHandler, userInfos } = useAuth();
  const Navigate = useNavigate();
  const [isGoogleRecaptchaVerify , setIsGoogleRecaptchaVerify] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    isDirty,
    isValid,
    formState,
  } = useForm(
    {
      mode: "all",
    },
    {
      defaultValues: {
        UserName: "",
        Password: '',
      },
    }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const userLoginHandler = (data) => {
    const userLoginDate = {
      identifier: data.UserName,
      password: data.Password,
    };
    const ResponseResult = ApiRequest.post("auth/login", userLoginDate)
      .then((response) => {
        if (response.status === 200) {
          LoginHandler(userInfos, response.data.accessToken);
          Navigate("/" , {replace: true});
          toast.success(" ورود با موفقیت انجام گردید");
        }
      })
  };
   const RecaptchaChangeHandler = () => {
    setIsGoogleRecaptchaVerify(true)
   }

  return (
    <>
      <LoginRegisterTemplate>
        <div className="text-center mb-7 sm:mb-9">
          <h2 className="font-MorabbaMd text-zinc-700 dark:text-white text-3xl mb-2 sm:mb-3">
            ورود
          </h2>
          <span className="font-Dana text-lg text-slate-500 dark:text-gray-500">
            حساب کاربری ندارید؟
            <Link
              to="/register"
              className="text-primary font-Dana mr-1 hover:text-green-500 transition-colors"
            >
              ثبت نام
            </Link>
          </span>
        </div>
        {/* Inputs */}
        <form onSubmit={handleSubmit(userLoginHandler)}>
          <div className="space-y-2.5 sm:space-y-3.5">
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
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
                    message: "کلمه عبور معتبر نمی باشد",
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

            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={RecaptchaChangeHandler} />
          </div>
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={(!formState.isValid || !isGoogleRecaptchaVerify)}
          >
            تایید
          </Button>
        </form>
        <div className="flex items-center mt-5 text-sm text-slate-500 dark:text-slate-400 tracking-tight">
          <Link to="/termsConditions">مطالعه حریم خصوصی کاربر</Link>
        </div>
      </LoginRegisterTemplate>
    </>
  );
}

export default Login;
