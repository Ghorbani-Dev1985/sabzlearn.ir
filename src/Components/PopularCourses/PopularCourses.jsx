import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Slider from '../../common/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '../CourseCard/CourseCard'
import axios from 'axios'
import { BaseURL } from '../../Utils/Utils'
import ApiRequest from '../../Services/Axios/Configs/Config'
import CourseSkeleton from '../../common/CourseSkeleton/CourseSkeleton'


function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([])
  const [popularCoursesIsShowLoading, setPopularCoursesIsShowLoading] = useState(false)
  const abortController = new AbortController()
  useEffect(() => {
    setPopularCoursesIsShowLoading(true);
    const ResponseResult = ApiRequest('courses/popular' , {signal: abortController.signal})
    .then((response) => {
      setPopularCourses(response.data)
       setPopularCoursesIsShowLoading(false)
    });
    return () => {
      abortController.abort()
    }
  }, []);
  return (
    // PopularCourses Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-primary" title=" محبوب ترین دوره ها" subTitle=" پرمخاطب ترین و بهترین دوره های سبزلرن " isLink={true} to="courses/1" linkText="مشاهده همه دوره ها" />
       {/* PopularCourses */}
       {
        popularCoursesIsShowLoading ? <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'><CourseSkeleton listsToRender={4}/></div> :
       <Slider>
         {
         popularCourses.map(({_id, discount ,shortName , categoryID , cover , name , description , creator , price , courseAverageScore}) => {
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

export default PopularCourses


