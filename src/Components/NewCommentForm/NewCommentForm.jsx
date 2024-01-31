import React from 'react'
import UserImg from '../../assets/Images/CommentFormUser/none.png'
import Input from '../../common/Form/Input'


function NewCommentForm({showNewCommentForm , setShowNewCommentForm}) {
  const SubmitCommentHandler = () => {

  }
  const ssds = () => {
    
  }
  return (
    <>
    {
        showNewCommentForm && <><div className='flex gap-x-2 mb-3'>
       <img src={UserImg} className='block w-10 h-10 md:w-14 md:h-14 object-cover rounded-full shrink-0' alt='ghorbani-dev.ir'/>
       <div className='flex flex-col'>
        <span className='text-zinc-700 dark:text-white font-DanaMd text-base md:text-xl'>Username</span>
        <span className='text-slate-500 dark:text-gray-500 text-sm'>ثبت نظر جدید</span>
       </div>
    </div>
     <Input element="textarea" textareaRow="6" textareaPlaceholder="نظر خود را بنویسید ..." />
    <div className='flex gap-x-2 justify-end mt-2.5'>
    <Button btnType="submit"  className="button-md button-gray rounded-xl disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={false} onClick={ssds}>  لغو </Button>
    
    <Button btnType="submit"  className="button-md button-secondary rounded-xl disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={false} onClick={SubmitCommentHandler}>  ثبت </Button>
    </div></>
    }
    
    </>
  )
}

export default NewCommentForm
