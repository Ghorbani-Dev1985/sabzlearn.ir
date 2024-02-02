import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { Person, Visibility } from "@mui/icons-material";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Input from "../../common/Form/Input";
import Button from "../../common/Form/Button";
import {
  RequiredValidator,
  MinValidator,
  MaxValidator,
} from "../../Validators/Rules";
import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BaseURL } from "../../Utils/Utils";
import toast from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const title = useTitle("ورود به حساب");
  const { LoginHandler, userInfos } = useAuth();
  const Navigate = useNavigate();
  const [isGoogleRecaptchaVerify , setIsGoogleRecaptchaVerify] = useState(false)
  const [formState, onInputHandler] = useForm(
    {
      UserName: {
        value: "",
        isValid: false,
      },
      Password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const userLoginHandler = (event) => {
    event.preventDefault();
    const userDate = JSON.stringify({
      identifier: formState.inputs.UserName.value,
      password: formState.inputs.Password.value,
    });
    axios
      .post(`${BaseURL}auth/login`, userDate, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          LoginHandler(userInfos, response.data.accessToken);
          Navigate("/");
          toast.success(" ورود با موفقیت انجام گردید");
        }
      })
      .catch((err) => {
        console.log("err =>", err);
        toast.error("چنین اطلاعاتی موجود نمی باشد ");
      });
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
        <form>
          <div className="space-y-2.5 sm:space-y-3.5">
            <Input
              id="UserName"
              element="input"
              placeholder="نام کاربری یا آدرس ایمیل"
              icon={<Person className="left-3 sm:left-4" />}
              validations={[
                RequiredValidator(),
                MinValidator(8),
                MaxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <Input
              id="Password"
              element="input"
              type={showPassword ? "text" : "password"}
              placeholder="کلمه عبور"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              icon={
                <Visibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="left-3 sm:left-4 cursor-pointer"
                />
              }
              validations={[
                RequiredValidator(),
                MinValidator(8),
                MaxValidator(25),
              ]}
              onInputHandler={onInputHandler}
            />
            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={RecaptchaChangeHandler} />
          </div>
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={(!formState.isFormValid || !isGoogleRecaptchaVerify)}
            onClick={userLoginHandler}
          >
            تایید
          </Button>
        </form>
        <div className="flex items-center mt-5 text-sm text-slate-500 dark:text-slate-400 tracking-tight">
          <Link to="/termsConditions">حریم خصوصی</Link>
        </div>
      </LoginRegisterTemplate>
    </>
  );
}

export default Login;
