import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumb() {
  return (
    <div className='w-full h-[50px] flex items-center overflow-x-auto overflow-y-hidden rounded-2xl leading-7 bg-white dark:bg-gray-800 text-zinc-700 dark:text-white text-xl shadow-breadcrumb'>
      <div className='breadcrumb__item'>
        <Link to="/" className='whitespace-nowrap'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
        </Link>
      </div>
      <div className='breadcrumb__item'>
        <Link to="#" className='whitespace-nowrap'>    دوره ها   </Link>
      </div>
      <div className='breadcrumb__item'>
        <Link to="#" className='whitespace-nowrap'>  ارتقای مهارت   </Link>
      </div>
      <div className='breadcrumb__item before:hidden after:hidden'>
        <Link to="#" className='whitespace-nowrap'>	توسعه کتابخانه با جاوااسکریپت	 </Link>
      </div>
    </div>
  )
}

export default Breadcrumb
