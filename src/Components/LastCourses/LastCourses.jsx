import React from 'react'
import SectionTitle from '../../common/SectionTitle/SectionTitle'

function LastCourses() {
  return (
    <section className='relative mt-22 sm:mt-40'>
         <div class="dark:hidden hidden md:block w-[500px] h-[500px] lg:w-[630px] lg:h-[630px] bg-sky-500 opacity-20 blur-2xl rounded-full -z-10 absolute -right-[320px] lg:-right-[400px] -top-80"></div>
        {/* Last Courses Component */}
     <SectionTitle squareColor="bg-amber-400 dark:bg-yellow-400" title="آخرین دوره ها" subTitle="سکوی پرتاپ شما به سمت موفقیت" isLink={true} to="" linkText="مشاهده همه دوره ها" /> 
    </section>
  )
}

export default LastCourses
