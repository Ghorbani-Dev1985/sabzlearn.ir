import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import Slider from '../../common/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '../CourseCard/CourseCard'
import ApiRequest from '../../Services/Axios/Configs/Config'
import CourseSkeleton from '../../common/CourseSkeleton/CourseSkeleton'


function PresellCourses() {
  const [presellCourses , setPresellCourses] = useState([])
  const [presellCoursesIsShowLoading, setPresellCoursesIsShowLoading] = useState(false)
  const abortController = new AbortController()
  useEffect(() => {
    setPresellCoursesIsShowLoading(true);
    const ResponseResult = ApiRequest('courses/presell' , {signal: abortController.signal})
    .then((response) => {
       setPresellCourses(response.data)
      setPresellCoursesIsShowLoading(false)
    });
    return () => {
      abortController.abort()
    }
  }, []);
  return (
    // PresellCourses Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-primary" title=" در حال پیش فروش " subTitle=" دوره هایی که قراره برگزار بشن " isLink={false}>
       <div className='flex gap-4'>
        <button type='button' id="PresellCoursesSwiperNextBtn" className='flex-center size-11 rounded-full shrink-0 bg-gray-200 hover:bg-white text-slate-500 transition-colors'>
          <ChevronRightOutlined />
        </button>
        <button type='button' id='PresellCoursesSwiperPrevBtn' className='flex-center size-11 rounded-full shrink-0 bg-gray-200 hover:bg-white text-slate-500 transition-colors'>
          <ChevronLeftOutlined />
        </button>
        </div>
        </SectionTitle>
       {/* PresellCourses */}
        {
          presellCoursesIsShowLoading ? <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'><CourseSkeleton listsToRender={4}/></div> :
       <Slider SwiperNextBtnID="#PresellCoursesSwiperNextBtn" SwiperPrevBtnID="#PresellCoursesSwiperPrevBtn">
         {
         
         presellCourses.map(({_id, shortName , discount , categoryID , cover , name , description , creator , price , courseAverageScore}) => {
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

export default PresellCourses


