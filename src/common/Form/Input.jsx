import React from 'react'

function Input({children, element , textareaRow , textareaPlaceholder , type = 'text' , placeholder , value , onChange ,  icon }) {
    const elementType = element === 'textarea' ? <textarea rows={textareaRow} placeholder={textareaPlaceholder} className="block w-full p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-gray-200 dark:focus:border-slate rounded-2xl placeholder:font-danaLight transition-colors"></textarea> :
    <div className="relative">
          <input
              type={type}
              className="outline-none pl-9 sm:pl-12"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              />
            {icon}
            {children}
          </div>
  return (
    <>
    {elementType}
    </>
  )
}

export default Input
