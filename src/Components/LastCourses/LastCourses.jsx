import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import CourseCard from '../CourseCard/CourseCard'
import axios from 'axios';
import { BaseURL } from '../../Utils/Utils';
import { useCourses } from '../../Contexts/CoursesContext';
import CourseSkeleton from '../../common/CourseSkeleton/CourseSkeleton';


function LastCourses() {
    const {courses , courseIsShowLoading} = useCourses()
  return (
    <section className='relative mt-22 sm:mt-40'>
         <div className="dark:hidden hidden md:block w-[500px] h-[500px] lg:w-[630px] lg:h-[630px] bg-sky-500 opacity-20 blur-2xl rounded-full -z-10 absolute -right-[320px] lg:-right-[400px] -top-80"></div>
        {/* Last Courses Component */}
     <SectionTitle squareColor="bg-amber-400 dark:bg-yellow-400" title="آخرین دوره ها" subTitle="سکوی پرتاپ شما به سمت موفقیت" isLink={true} to="/courses/1" linkText="مشاهده همه دوره ها" /> 
     {/* Last Course List */}
     <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
         {
            courseIsShowLoading ?  <CourseSkeleton listsToRender={8}/> : 
            courses.splice(0 , 8).map(({_id, shortName , discount , categoryID , cover , name , description , creator , price , courseAverageScore}) => {
                return(
                    <React.Fragment key={_id}>
                        <CourseCard shortName={shortName} categoryTitle={categoryID.title} categoryShortName={categoryID.name} discount={discount} cover={cover} name={name} description={description} creator={creator} price={price} courseAverageScore={courseAverageScore}/>
                    </React.Fragment>
                )
            })
        }
         

     </div>
    </section>
  )
}

export default LastCourses
