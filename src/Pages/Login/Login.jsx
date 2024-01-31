import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { Person, Visibility } from "@mui/icons-material";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Input from "../../common/Form/Input";

function Login() {
  const title = useTitle("ورود به حساب");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
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
      <form>
        <div className="space-y-2.5 sm:space-y-3.5">
          <Input element="input" placeholder="نام کاربری یا آدرس ایمیل" value="" onChange="" icon={<Person className="left-3 sm:left-4" />}/>
          <Input element="input" type={showPassword ? "text" : "password"} placeholder="کلمه عبور" value={password} onChange={(event) => setPassword(event.target.value)} icon={<Visibility
              onClick={() => setShowPassword((prev) => !prev)}
              className="left-3 sm:left-4 cursor-pointer" />}/>
        </div>
        <button
          type="submit"
          className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full"
        >
          تایید
        </button>
      </form>
      <div className="flex items-center mt-5 text-sm text-slate-500 dark:text-slate-400 tracking-tight">
        <Link to="/termsConditions">حریم خصوصی</Link>
      </div>
          </LoginRegisterTemplate>
    </>
  );
}

export default Login;
