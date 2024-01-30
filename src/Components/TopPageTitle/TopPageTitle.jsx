import React from 'react'

function TopPageTitle({bgColor , title}) {
  return (
    <h2 className='flex items-center gap-x-3 sm:gap-x-5 w-min mx-auto mt-15 dark:text-white font-MorabbaBold text-4xl sm:text-6xl whitespace-nowrap'>
    <span className={`${bgColor} block w-7 sm:w-10 h-2.5 shrink-0 rounded-sm`}></span>
      {title}
  </h2>
  )
}

export default TopPageTitle
