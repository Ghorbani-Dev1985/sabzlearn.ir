import React from 'react'

function TopPageTitle({bgColor , title , countCourse}) {

  return (
    <h2 className='flex items-center gap-x-3 sm:gap-x-5 w-min mx-auto mt-15 dark:text-white font-MorabbaBold text-4xl sm:text-6xl whitespace-nowrap'>
    <span className={`${bgColor} block w-7 sm:w-10 h-2.5 shrink-0 rounded-sm`}></span>
      {title} {countCourse > 0 && <span className='flex-center font-DanaBold font-extrabold size-16 bg-white pt-3 dark:bg-mainSlate text-primary rounded-full'>{countCourse}</span>}
  </h2>
  )
}

export default TopPageTitle
