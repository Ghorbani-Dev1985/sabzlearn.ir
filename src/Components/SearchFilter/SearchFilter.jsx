import { Search } from '@mui/icons-material'
import React from 'react'
import Button from '../../common/Form/Button'

function SearchFilter({children}) {
  const SearchHandler = () => {
    
  }
   return (
    <aside className='sticky top-36 space-y-5'>
    {/* Search Box */}
    <form className='space-y-5'>
     <div className='h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
        <div className='h-full flex-between text-slate-500 dark:text-gray-500'>
         <input type='text' className='w-full bg-transparent dark:bg-transparent outline-none text-sm font-dana pr-7 border-none' placeholder='در بین دوره ها جستجو کنید'/>
         <Button btnType="submit"  className="mr-4 ml-6" disabled={false} onClick={SearchHandler}> <Search className='size-7'/></Button>
        </div>
     </div>
     {children}
     {/* Toggle Box */}
     <div className='hidden sm:grid grid-cols-2 lg:grid-cols-1 gap-5'>
        {/* Free Course */}
         <div className='px-7 h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
            <div className='flex-between h-full'>
              <span className='text-sm text-zinc-700 dark:text-white select-none'>فقط دوره های رایگان</span>
              <label className='relative cursor-pointer select-none'>
                  <input type='checkbox' className='toggle__input absolute h-0 w-0 opacity-0'/>
                  <span className='toggle__select'></span>
              </label>
            </div>
         </div>
        {/* Presell Course */}
        <div className='px-7 h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
          <div className='flex-between h-full'>
            <span className='text-sm text-zinc-700 dark:text-white select-none'>در حال پیش فروش</span>
            <label className='relative cursor-pointer select-none'>
                  <input type='checkbox' className='toggle__input absolute h-0 w-0 opacity-0'/>
                  <span className='toggle__select'></span>
              </label>
          </div>
        </div>
     </div>
    </form>
 </aside>
  )
}

export default SearchFilter
