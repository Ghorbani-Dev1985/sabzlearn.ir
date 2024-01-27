import { ChevronLeft } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

function InstagramPage() {
  return (
    // Instagram Page Component
    <section className='mt-25'>
      <div className='bg-instagramPage sm:bg-section-pattern flex-between flex-col md:flex-row gap-y-4 text-center md:text-right p-8 lg:px-14 md:h-40 lg:h-36 rounded-2xl '>
        <div className='text-white space-y-4'>
              <h4 className='font-MorabbaBold text-4xl leading-[58px]'>پیج اینستاگرام آکادمی سبزلرن</h4>
              <p className='text-lg'>اطلاع رسانی تخفیف ها، آموزش های رایگان و نکات کاربردی و لایو های هفتگی</p>
        </div>
        <Link to="instagram://user?username=sabzlearn_" className='bg-white/30 text-white inline-flex items-center shrink-0 text-base h-12 px-4 gap-x-0.5 rounded-xl sm:text-[#502ED6] sm:bg-white border border-transparent hover:border-white hover:text-white hover:bg-transparent transition-colors'>
            <span className='font-DanaMd'>دیدن پست ها</span>
            <ChevronLeft className="size-5"/>
        </Link>
      </div>
    </section>
  )
}

export default InstagramPage
