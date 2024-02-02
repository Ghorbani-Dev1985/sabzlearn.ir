import React, { useState } from 'react'
import UserImg from '../../assets/Images/CommentFormUser/none.png'
import Input from '../../common/Form/Input'
import Button from '../../common/Form/Button'
import useForm from '../../Hooks/useForm';
import ReCAPTCHA from "react-google-recaptcha";
import {
  RequiredValidator,
  MinValidator,
  MaxValidator,
} from "../../Validators/Rules";


function NewCommentForm({showNewCommentForm , setShowNewCommentForm}) {
  const [isGoogleRecaptchaVerify , setIsGoogleRecaptchaVerify] = useState(false)
  const [formState, onInputHandler] = useForm(
    {
      NewComment: {
        value: "",
        isValid: false,
      },

    },
    false
  );
  const SubmitCommentHandler = () => {

  }
  const ssds = () => {
    
  }
  const RecaptchaChangeHandler = () => {
    setIsGoogleRecaptchaVerify(true)
   }
  return (
    <>
    {
        showNewCommentForm && <><div className='flex gap-x-2 mb-5'>
       <img src={UserImg} className='block w-10 h-10 md:w-14 md:h-14 object-cover rounded-full shrink-0' alt='ghorbani-dev.ir'/>
       <div className='flex flex-col'>
        <span className='text-zinc-700 dark:text-white font-DanaMd text-base md:text-xl'>Username</span>
        <span className='text-slate-500 dark:text-gray-500 text-sm'>ثبت نظر جدید</span>
       </div>
    </div>
     <Input id="NewComment" element="textarea" textareaRow="6" textareaPlaceholder="نظر خود را بنویسید ..." onInputHandler={onInputHandler} validations={[
                RequiredValidator(),
                MinValidator(20),
                MaxValidator(1000),
              ]}/>
              <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={RecaptchaChangeHandler} />
    <div className='flex gap-x-2 justify-end mt-2.5 mb-6'>
    <Button onClick={() => setShowNewCommentForm((prev) => !prev)} btnType="submit"  className="button-md button-gray rounded-xl disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={false} >  لغو </Button>
    
    <Button btnType="submit"  className="button-md button-secondary rounded-xl disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={(!formState.isFormValid || !isGoogleRecaptchaVerify)} onClick={SubmitCommentHandler}>  ثبت </Button>
    </div></>
    }
    
    </>
  )
}

export default NewCommentForm
