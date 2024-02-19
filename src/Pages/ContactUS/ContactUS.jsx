import { Email, Person, PhoneIphone, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRegisterTemplate from "../../Components/LoginRegisterTemplate/LoginRegisterTemplate";
import Button from "../../common/Form/Button";
import useTitle from "../../Hooks/useTitle";
import toast from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import ApiRequest from "../../Services/Axios/Configs/Config";
import { useForm } from "react-hook-form";

function ContactUS() {
  const [showPassword, setShowPassword] = useState(false);
  const title = useTitle(" ثبت نام")
  const { LoginHandler} = useAuth()
  const [isGoogleRecaptchaVerify , setIsGoogleRecaptchaVerify] = useState(false)
  const { register , handleSubmit , formState: {errors} , reset , isDirty, isValid , formState} = useForm(
    {
     mode: 'all'
    },
    {
     defaultValues: {
      FullName: '',
      MobilNumber: '',
      Email: '',
      UserMessage: ''
     }
  })
  console.log(isDirty , isValid)
  const FormSubmitting = (data) => {
    console.log(data)
    const newMsgInfos = {
      name: data.FullName,
      phone: data.MobilNumber,
      email: data.Email,
      body: data.UserMessage,
    }
    const ResponseResult = ApiRequest.post('contact' , newMsgInfos)
      .then(response => {
        console.log(response)
        if(response.status === 201){
          toast.success("پیام شما با موفقیت ارسال گردید")
        }else{
          toast.error("پیام شما ارسال نگردید")
        }
      })
    reset()
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
      <form onSubmit={handleSubmit(FormSubmitting)}>
        <div className="space-y-2.5 sm:space-y-3.5">
          {/* FullName */}
        <div className="relative">
          <input
              {...register('FullName' , {
                required: 'وارد کردن نام و نام خانوادگی اجباری می باشد',
                minLength: {
                  value: 5,
                  message: 'لطفا حداقل ۵ کاراکتر وارد نمایید'
                },
                maxLength: {
                  value: 15,
                  message: ' لطفا حداکثر ۱۵ کاراکتر وارد نمایید'
                },
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/g,
                  message: 'لطفا فقط حروف فارسی وارد نمایید'
                }
              })}
              className={`${errors.FullName && 'border border-rose-500'} outline-none pl-9 sm:pl-12`}
              placeholder=" نام و نام خانوادگی*"
              />
            <Person className="left-3 sm:left-4" />
          </div>
            <span className="block text-rose-500 text-sm my-2">{errors.FullName && errors.FullName.message}</span>
          {/* MobileNumber */}
          <div className="relative">
          <input
              type="tel"
              {...register('MobilNumber' , {
                required: 'وارد کردن تلفن تماس اجباری می باشد',
                minLength: {
                  value: 10,
                  message: 'لطفا حداقل ۱۰ کاراکتر وارد نمایید'
                },
                maxLength: {
                  value: 11,
                  message: 'لطفا حداکثر ۱۱ کاراکتر وارد نمایید'
                },
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                  message: 'لطفا فقط عدد وارد نمایید'
                }
              })}
              className={`${errors.MobilNumber && 'border border-rose-500'} outline-none pl-9 sm:pl-12 placeholder:text-right`}
              placeholder=" تلفن تماس*"
              />
            <PhoneIphone className="left-3 sm:left-4" />
          </div>    
          <span className="block text-rose-500 text-sm my-2">{errors.MobilNumber && errors.MobilNumber.message}</span>  
           {/* Email */}
           <div className="relative">
          <input
             type="text"
              {...register('Email' , {
                required: 'وارد کردن ایمیل اجباری می باشد',
                minLength: {
                  value: 5,
                  message: 'لطفا حداقل ۵ کاراکتر وارد نمایید'
                },
                maxLength: {
                  value: 30,
                  message: 'لطفا حداکثر ۲۰ کاراکتر وارد نمایید'
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g,
                  message: 'لطفا ایمیل صحیح وارد نمایید'
                }
              })}
              className={`${errors.Email && 'border border-rose-500'} outline-none pl-9 sm:pl-12 dir-ltr placeholder:text-right`}
              placeholder="  ایمیل*"
              />
            <Email className="left-3 sm:left-4" />
          </div> 
          <span className="block text-rose-500 text-sm my-2">{errors.Email && errors.Email.message}</span>  
            {/* UserMessage */}
            <textarea rows="6" {...register('UserMessage' , { 
                required: 'وارد کردن متن پیام الزامی می باشد',
                minLength: {
                  value: 20,
                  message: 'لطفا حداقل ۲۰ کاراکتر وارد نمایید'
                },
                maxLength: {
                  value: 150,
                  message: 'لطفا حداقل ۱۵۰ کاراکتر وارد نمایید'
                },})} placeholder='پیام خود را وارد نمایید ...' className={`${errors.UserMessage && 'border border-rose-500'} mb-3 block w-full outline-none p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 rounded-2xl placeholder:font-danaLight transition-colors`}></textarea>
                <span className="block text-rose-500 text-sm my-2">{errors.UserMessage && errors.UserMessage.message}</span> 
            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={RecaptchaChangeHandler} />
        </div>
        <Button btnType="submit" disabled={!formState.isValid || !isGoogleRecaptchaVerify} className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" >ارسال</Button>
      </form>
              </LoginRegisterTemplate>
    </>
  );
}

export default ContactUS;
