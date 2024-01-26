import { KeyboardBackspace } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

function SectionTitle({squareColor, title , subTitle , isLink , linkText}) {
  return (
    // Section Title 
    <div className='flex-between flex-wrap flex-col mb-10 sm:flex-row gap-4'>
      <div className='space-y-2.5 self-start'>
        <div className='flex items-center gap-x-2.5 sm:gap-x-3.5'>
            <span className={`${squareColor} inline-block w-3.5 h-3.5 rounded-sm`}></span>
            <h3 className='text-zinc-700 dark:text-white font-DanaBold text-2xl sm:text-3xl'>{title}</h3>
        </div>
        <p className='text-slate-500 dark:text-slate-400 sm:text-xl'>{subTitle}</p>
      </div>
      {
         isLink && 
         <Link className='flex items-center self-end sm:self-auto gap-x-0.5 rounded-xl px-2.5 py-2 text-sky-500 hover:bg-sky-500/10 dark:text-secondary dark:hover:bg-secondary/10 transition-colors'>
            <span className='font-DanaMd'>{linkText}</span>
            <KeyboardBackspace className='!size-5'/>
         </Link>
      }
    </div>
  )
}

export default SectionTitle
