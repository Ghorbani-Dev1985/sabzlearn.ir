import { Email, Person, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Input from "../../common/Form/Input";
import Button from "../../common/Form/Button";
import useTitle from "../../Hooks/useTitle";
import useForm from "../../Hooks/useForm";
import { RequiredValidator , MinValidator , MaxValidator , EmailValidator} from '../../Validators/Rules'
import toast from "react-hot-toast";
import useInsert from "../../Hooks/useInsert";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { BaseURL } from "../../Utils/Utils";


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const title = useTitle(" ثبت نام");
  const { LoginHandler} = useAuth()
  const [formState , onInputHandler] = useForm({
    FullName: {
      value: '',
      isValid: false
    },
    UserName: {
      value: '',
      isValid: false
    },
    Email: {
      value: '',
      isValid: false
    },
    Password: {
      value: '',
      isValid: false
    },
    ConfirmPassword: {
      value: '',
      isValid: false
    }
  } , false)
  const [password, setPassword] = useState("");
  const registerNewUserHandler = (event) => {
    event.preventDefault()
    
        const newUserInfos = JSON.stringify({
          name: formState.inputs.FullName.value,
          username: formState.inputs.UserName.value,
          email: formState.inputs.Email.value,
          password: formState.inputs.Password.value,
          confirmPassword: formState.inputs.ConfirmPassword.value
        })
        if(formState.inputs.Password.value === formState.inputs.ConfirmPassword.value){
          axios.post(`${BaseURL}auth/register` , newUserInfos , {
            headers : {
              'Content-Type' : 'application/json'
            }
          })
          .then(response => {
            console.log(response)
            LoginHandler(response.data.user , response.data.accessToken)
            toast.success("ثبت نام با موفقیت انجام گردید")
          })
          .catch(error => {
              console.log(error)
              toast.error("  خطا در اتصال به سرور ");
          })
          
        }else{
          toast.error("کلمه عبور با تکرار کلمه عبور همخوانی ندارد")
        }
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
      <form>
        <div className="space-y-2.5 sm:space-y-3.5">
        <Input id="FullName" element="input" placeholder=" نام و نام خانوادگی" value="" icon={<Person className="left-3 sm:left-4" />} validations={[RequiredValidator() , MinValidator(6) , MaxValidator(30)]} onInputHandler={onInputHandler}/>
          <Input id="UserName" element="input" placeholder=" نام کاربری" value="" icon={<Person className="left-3 sm:left-4" />} validations={[RequiredValidator() , MinValidator(8) , MaxValidator(20)]} onInputHandler={onInputHandler}/>
          <Input id="Email" element="input" placeholder=" آدرس ایمیل  " value="" icon={ <Email className="left-3 sm:left-4" />} validations={[RequiredValidator() , MinValidator(8) , MaxValidator(30) , EmailValidator()]} onInputHandler={onInputHandler}/>
          <Input id="Password" element="input" type={showPassword ? "text" : "password"} placeholder=" کلمه عبور   " value={password} onChange={(event) => setPassword(event.target.value)} icon={  <Visibility
              onClick={() => setShowPassword((prev) => !prev)}
              className="left-3 sm:left-4 cursor-pointer"
            />} validations={[RequiredValidator() , MinValidator(8) , MaxValidator(30) ]} onInputHandler={onInputHandler}/>
          <Input id="ConfirmPassword" element="input" type={showPassword ? "text" : "password"} placeholder=" تکرار کلمه عبور   " icon={  <Visibility
              onClick={() => setShowPassword((prev) => !prev)}
              className="left-3 sm:left-4 cursor-pointer"
            />} validations={[RequiredValidator() , MinValidator(8) , MaxValidator(30)]} onInputHandler={onInputHandler}/>
        </div>
        <Button btnType="submit"  className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={!formState.isFormValid} onClick={registerNewUserHandler}>ادامه</Button>
      </form>
              </LoginRegisterTemplate>
    </>
  );
}

export default Register;
