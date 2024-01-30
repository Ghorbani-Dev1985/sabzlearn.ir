import React from 'react'

function TopSort({children , BtnOne , BtnTwo , BtnThree , BtnFour}) {
  return (
    <>
          {/* Sort In Desktop */}
          <div className='hidden sm:flex items-center px-7 mb-5 h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
               <div className='flex-center lg:justify-start gap-4 text-sm'>
            <span className='flex items-center shrink-0 gap-x-2.5 dark:text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25.811 17.879" className="size-5" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
        <path d="M.556,16.379V0" transform="translate(4.349)"/>
        <path d="M9.809,0,4.9,4.927,0,0" transform="translate(0 11.452)"/>
        <path d="M5.5.5H0" transform="translate(15.316 10.415)"/>
        <path d="M7.322.5H0" transform="translate(15.316 4.883)"/>
        <path d="M3.314.5H0" transform="translate(15.316 15.708)"/>
        <path d="M8.684.5H0" transform="translate(15.316 0.072)"/>
    </svg>
       <span>مرتب سازی</span>
            </span>
            <div className='flex items-center flex-wrap'>
                <button className='button-sort font-DanaMd bg-gray-100 dark:bg-mainSlate text-zinc-700 dark:text-white'>{BtnOne}</button>
                <button className='button-sort'>  {BtnTwo}</button>
                <button className='button-sort'>  {BtnThree}</button>
                <button className='button-sort'>  {BtnFour}</button>
                {children}
            </div>
               </div>
          </div>
    </>
  )
}

export default TopSort
