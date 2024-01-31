import { Email, Person, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Input from "../../common/Form/Input";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
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
      <form>
        <div className="space-y-2.5 sm:space-y-3.5">
          <Input element="input" placeholder=" نام کاربری" value="" onChange="" icon={<Person className="left-3 sm:left-4" />}/>
          <Input element="input" placeholder=" آدرس ایمیل  " value="" onChange="" icon={ <Email className="left-3 sm:left-4" />}/>
          <Input element="input" type={showPassword ? "text" : "password"} placeholder=" آدرس ایمیل  " value={password} onChange={(event) => setPassword(event.target.value)} icon={  <Visibility
              onClick={() => setShowPassword((prev) => !prev)}
              className="left-3 sm:left-4 cursor-pointer"
            />}/>
          <Input element="input" type={showPassword ? "text" : "password"} placeholder=" تکرار کلمه عبور   " value={password} onChange={(event) => setPassword(event.target.value)} icon={  <Visibility
              onClick={() => setShowPassword((prev) => !prev)}
              className="left-3 sm:left-4 cursor-pointer"
            />}/>
        </div>
        <button
          type="submit"
          className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full"
        >
          ادامه
        </button>
      </form>
              </LoginRegisterTemplate>
    </>
  );
}

export default Register;
