import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import { Link } from 'react-router-dom'
import { GppGoodOutlined } from '@mui/icons-material'
import TomanDark from '../../assets/Images/svgs/toman-black.svg'
import TomanLight from '../../assets/Images/svgs/toman-white.svg'
import Banner from '../../assets/Images/Courses/Course-thumbnail-Dashboard2-1-768x432.webp'
import { usePublicDarkMode } from '../../Contexts/DarkModeContext'

function Course() {
  const { colorTheme } = usePublicDarkMode();
  return (
    <>
    {/* Breadcrumb */}
      <Breadcrumb />
      {/* Head */}
      <div className='flex-between flex-col-reverse lg:flex-row xl:items-stretch gap-x-5 xl:gap-x-10 bg-white dark:bg-gray-800 sm:bg-transparent sm:dark:bg-transparent p-3.5 sm:p-0 mt-5 mb-4 sm:my-10 rounded-2xl'>
         {/* Info */}
         <div className='flex flex-col justify-between w-full'>
          <div>
             <h1 className='font-MorabbaBold text-2xl/[42px] sm:text-3xl/[48px] lg:text-[32px]/[48px] text-zinc-700 dark:text-white lg:line-clamp-2'>
             توسعه کتابخانه با جاوااسکریپت
             </h1>
             <p className='font-Dana text-xl/8 line-clamp-4 lg:line-clamp-2 xl:line-clamp-3 mt-3.5 xl:mt-5 text-zinc-700 dark:text-white'>
             توسعه کتابخانه، نمونه کاری قوی برای رزومه شما است و این دوره آموزشی یادگیری چنین مهارتی رو با نکات کاربردی و کد نویسی و همچنین ساخت مستندات جامع و پروژه عملی فراهم میکند
             </p>
          </div>
          {/* Btn & Price */}
          <div className='mt-5 pt-5 sm:pt-0 xl:mt-0 border-t sm:border-t-0 border-t-gray-100 dark:border-t-gray-700'>
            <div className='flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-3.5 items-center'>
              <button className='w-full flex-center sm:w-auto button-xl rounded-lg button-primary'>
                <GppGoodOutlined />          
                  شرکت در دوره
                 </button>
                 <div className='text-center sm:text-right mb-5 sm:mb-0'>
                            <div className='flex-center sm:justify-end mb-1'>
                              <div className='flex-center gap-1 font-DanaBold text-3xl text-zinc-700 dark:text-white mr-4 sm:mr-2'>
                                 1,000,000
                                 {
                                  colorTheme === 'light' ? <img src={TomanLight} alt='ghorbani-dev.ir' className='size-6'/> :
                                  <img src={TomanDark} alt='ghorbani-dev.ir' className='size-6'/>
                                 }
                                 
                              </div>
                            </div>
                 </div>
            </div>
          </div>
         </div>
         {/* Banner */}
         <div className='shrink-0 mb-3 sm:mb-6 lg:mb-0 w-full h-auto md:w-10/12 lg:w-[440px] lg:h-[270px] xl:w-[610px] xl:h-[343px] rounded-2xl sm:rounded-3xl overflow-hidden'>
            <img src={Banner} alt='gorbani-dev.ir' />
         </div>
      </div>
    </>
  )
}

export default Course
