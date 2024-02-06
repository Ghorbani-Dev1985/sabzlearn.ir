import { Email, Person, PhoneIphone, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Input from "../../common/Form/Input";
import Button from "../../common/Form/Button";
import useTitle from "../../Hooks/useTitle";
import useForm from "../../Hooks/useForm";
import { RequiredValidator , MinValidator , MaxValidator , EmailValidator , PhoneValidator} from '../../Validators/Rules'
import toast from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { BaseURL } from "../../Utils/Utils";
import ReCAPTCHA from "react-google-recaptcha";

function ContactUS() {
  const [showPassword, setShowPassword] = useState(false);
  const title = useTitle(" ثبت نام");
  const { LoginHandler} = useAuth()
  const Navigate = useNavigate()
  const [isGoogleRecaptchaVerify , setIsGoogleRecaptchaVerify] = useState(false)
  const [formState , onInputHandler] = useForm({
    FullName: {
      value: '',
      isValid: false
    },
    MobilNumber: {
      value: '',
      isValid: false
    },
    Email: {
      value: '',
      isValid: false
    },
    UserMessage: {
      value: '',
      isValid: false
    },
  } , false)
  const sendNewContactUsMsg = (event) => {
    event.preventDefault()
    
        const newMsgInfos = JSON.stringify({
          name: formState.inputs.FullName.value,
          phone: formState.inputs.MobilNumber.value,
          email: formState.inputs.Email.value,
          body: formState.inputs.UserMessage.value,
        })

          axios.post(`${BaseURL}contact` , newMsgInfos , {
            headers : {
              'Content-Type' : 'application/json'
            }
          })
          .then(response => {
            console.log(response)
            if(response.status === 201){
              toast.success("پیام شما با موفقیت ارسال گردید")
              Navigate('/')
            }else{
              toast.error("پیام شما ارسال نگردید")
            }
          })
          .catch(error => {
              console.log(error)
              toast.error("  خطا در اتصال به سرور ");
          })
  }
  const RecaptchaChangeHandler = () => {
    setIsGoogleRecaptchaVerify(true)
   }
  return (
    <>
      <LoginRegisterTemplate>

      <div className="text-center mb-7 sm:mb-9">
        <h2 className="font-MorabbaBold text-zinc-700 dark:text-white text-3xl mb-2 sm:mb-3">
          ارسال پیام
        </h2>
      </div>
      {/* Inputs */}
      <form>
        <div className="space-y-2.5 sm:space-y-3.5">
        <Input id="FullName" element="input" placeholder=" نام و نام خانوادگی" icon={<Person className="left-3 sm:left-4" />} validations={[RequiredValidator() , MinValidator(6) , MaxValidator(30)]} onInputHandler={onInputHandler}/>
          <Input id="MobilNumber" element="input" type="number" placeholder="  تلفن تماس  " icon={ <PhoneIphone className="left-3 sm:left-4" />} validations={[RequiredValidator() , MinValidator(10) , MaxValidator(10) , PhoneValidator()]} onInputHandler={onInputHandler}/>
          <Input id="Email" element="input" placeholder=" آدرس ایمیل  " icon={ <Email className="left-3 sm:left-4" />} validations={[RequiredValidator() , MinValidator(8) , MaxValidator(30) , EmailValidator()]} onInputHandler={onInputHandler}/>
          <Input id="UserMessage" element="textarea" textareaPlaceholder=" پیام خود را وارد نمایید ..." validations={[RequiredValidator() , MinValidator(8) , MaxValidator(1200) ]} onInputHandler={onInputHandler}/>
             <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={RecaptchaChangeHandler} />
        </div>
        <Button btnType="submit"  className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={(!formState.isFormValid || !isGoogleRecaptchaVerify)} onClick={sendNewContactUsMsg}>ارسال</Button>
      </form>
              </LoginRegisterTemplate>
    </>
  );
}

export default ContactUS;
