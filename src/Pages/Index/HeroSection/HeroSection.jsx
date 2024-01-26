import { InfoOutlined } from '@mui/icons-material'
import { Link } from '@mui/material'
import React from 'react'

function HeroSection() {
  return (
    <section className='flex-center gap-y-10 flex-wrap lg:flex-nowrap lg:flex-between text-center lg:text-right'>
        <div className='w-full sm:w-auto order-2 lg:order-1'>
       {/* Notification */}
            <Link to="" className='inline-flex items-center gap-x-1.5 sm:gap-x-2 w-full xs:w-auto xs:max-w-[350px] sm:max-w-[450px] text-base lg:text-lg h-9 sm:min-h-[50px] px-2 sm:px-4 py-2.5 mt-6 bg-white dark:bg-gray-800 rounded-full border border-transparent hover:border-primary transition-all'>
                <span className='flex items-center gap-x-1.5 shrink-0 text-primary select-none'>
                    <InfoOutlined />
                      <span className='hidden sm:block'>توجه:</span>
                </span>
                <span className='block text-slate-500 dark:text-gray-500 text-right truncate'>  هدیه تخفیف بهمن ماه رو دیدی؟🌻 </span>
            </Link>
            {/* Hero Text Section */}
            <h2 className='font-MorabbaBold text-5xl lg:text-6xl text-zinc-700 dark:text-white leading-[80px] lg:leading-[96px]'>
						ما به هر قیمتی 
            <br className='hidden sm:inline'/>
            دوره تولید نمی کنیم!
            </h2>
            <p className='text-zinc-700 dark:text-white text-xl lg:text-2xl mt-5 sm:mt-6 lg:mt-7 max-w-[500px]'>
						با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن
            </p>
            <div className='flex-center flex-wrap lg:justify-start gap-5 sm:gap-7 mt-6 sm:mt-10 lg:mt-12'>
                <Link to="#" className='flex-center button-md sm:button-lg button-secondary rounded-full'>از اینجا شروع کن</Link>
                <Link to="#" className='flex items-center gap-x-2.5 text-slate-500 dark:text-slate-400 group sm:text-xl'>
                  <span className='flex-center button-primary text-white p-0 w-10 sm:w-14 h-10 sm:h-14 rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
             <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                  </span>
                  ما کی هستیم؟
                </Link>
            </div>
            {/* Image Section */}
            <div className='order-1 lg:order-2'>

            </div>
        </div>
    </section>
  )
}

export default HeroSection
