import { Email, Person, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <>
      <LoginRegisterTemplate subLink={ <p className="mt-4 sm:mt-6 font-danaLight sm:text-lg text-center text-slate-500 dark:text-gray-500">
             <span>با عضویت در سایت، تمامی  </span> 
              <Link to="" class="text-primary hover:text-green-500 transition-colors"> قوانین و شرایط </Link>
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
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12"
              placeholder=" نام کاربری"
              value=""
              />
            <Person className="left-3 sm:left-4" />
          </div>
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12"
              placeholder=" آدرس ایمیل "
              value=""
              />
            <Email className="left-3 sm:left-4" />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="outline-none pl-9 sm:pl-12"
              placeholder="کلمه عبور"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Visibility
              onClick={() => setShowPassword((prev) => !prev)}
              className="left-3 sm:left-4 cursor-pointer"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className="outline-none pl-9 sm:pl-12"
              placeholder="تکرار کلمه عبور"
              />
            <Visibility
             
              className="left-3 sm:left-4 cursor-pointer"
              />
          </div>
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
