import { Search } from '@mui/icons-material'
import React from 'react'

function Category() {
  return (
    <>
      {/* Category Title */}
      <h2 className='flex items-center gap-x-3 sm:gap-x-5 w-min mx-auto mt-15 dark:text-white font-MorabbaBold text-4xl sm:text-6xl whitespace-nowrap'>
        <span className='block w-7 sm:w-10 h-2.5 bg-rose-500 shrink-0 rounded-sm'></span>
          فرانت اند
      </h2>
      {/* Main Section */}
      <section className='relative grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 mt-9 sm:mt-25'>
           {/* Sidebar */}
           <aside className='lg:sticky top-5 space-y-5'>
              {/* Search Box */}
              <form className='space-y-5'>
               <div className='h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
                  <div className='h-full flex-between text-slate-500 dark:text-gray-500'>
                   <input type='text' className='w-full bg-transparent dark:bg-transparent outline-none text-sm font-dana pr-7 border-none' placeholder='در بین دوره ها جستجو کنید'/>
                   <button type='submit' className='mr-4 ml-6'>
                       <Search className='size-7'/>
                   </button>
                  </div>
               </div>
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
           {/* Main Content */}
           <section className='col-span-1 lg:col-span-2 xl:col-span-3 order-1 lg:order-2'>

           </section>
      </section>
    </>
  )
}

export default Category