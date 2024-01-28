import React from 'react'
import UserImg from '../../assets/Images/CommentFormUser/none.png'


function NewCommentForm({showNewCommentForm}) {
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
    <textarea rows="6" placeholder="نظر خود را بنویسید ..."className="block w-full p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-gray-200 dark:focus:border-slate rounded-2xl placeholder:font-danaLight transition-colors"></textarea>
    <div className='flex gap-x-2 justify-end mt-2.5'>
     <button className='button-md button-gray rounded-xl'>لغو</button>
     <button className='button-md button-secondary rounded-xl'>ثبت</button>
    </div></>
    }
    
    </>
  )
}

export default NewCommentForm
