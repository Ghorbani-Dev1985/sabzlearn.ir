import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import Slider from '../../common/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '../CourseCard/CourseCard'
import { useCourses } from '../../Contexts/CoursesContext'
import CourseSkeleton from '../../common/CourseSkeleton/CourseSkeleton'


function NewCourses() {
  const {courses , courseIsShowLoading} = useCourses()
  return (
    // NewCourses Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-primary" title=" جدیدترین دوره ها" subTitle=" یادگیری و رشد توسعه فردی " isLink={false}>
        <div className='flex gap-4'>
        <button type='button' id="NewCoursesSwiperNextBtn" className='flex-center size-11 rounded-full shrink-0 bg-gray-200 hover:bg-white text-slate-500 transition-colors'>
          <ChevronRightOutlined />
        </button>
        <button type='button' id='NewCoursesSwiperPrevBtn' className='flex-center size-11 rounded-full shrink-0 bg-gray-200 hover:bg-white text-slate-500 transition-colors'>
          <ChevronLeftOutlined />
        </button>
        </div>
        </SectionTitle> 
       {/* NewCourses */}
         {
           courseIsShowLoading ? <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'><CourseSkeleton listsToRender={4}/></div> : 
            <Slider SwiperNextBtnID="#NewCoursesSwiperNextBtn" SwiperPrevBtnID="#NewCoursesSwiperPrevBtn" >
        {
           courses.map(({_id, shortName , discount , categoryID , cover , name , description , creator , price , courseAverageScore}) => {
           return(
                          <SwiperSlide className='rounded-2xl' key={_id}>
                          <CourseCard shortName={shortName} discount={discount} categoryTitle={categoryID.title} categoryShortName={categoryID.name} cover={cover} name={name} description={description} creator={creator} price={price} courseAverageScore={courseAverageScore}/>
                            
                          </SwiperSlide>
                )
              })
        }
       </Slider>

         }
      
    </section>
  )
}

export default NewCourses


