import React from 'react'
import { Link } from 'react-router-dom'

function LoginRegister() {
  return (
    <div className='relative text-base xl:text-lg text-white md:h-14 md:w-[155px] xl:w-[180px]'>
      <Link className='absolute right-0 w-25 xl:w-28 hidden md:flex items-center justify-start h-full bg-sky-500/50 hover:bg-sky-400 dark:bg-secondaryLight dark:hover:bg-secondary/60 rounded-full pr-5 transition-colors'>ورود</Link>
      <Link className='absolute left-0 w-25 xl:w-28 hidden md:flex items-center justify-center h-full bg-sky-500 hover:bg-sky-600 dark:bg-secondary dark:hover:bg-[#3F6CD8] rounded-full z-10 transition-colors'>عضویت</Link>
    </div>
  )
}

export default LoginRegister
