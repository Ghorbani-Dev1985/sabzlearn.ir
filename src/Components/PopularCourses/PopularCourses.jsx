import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Slider from '../../common/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '../CourseCard/CourseCard'
import { useCourses } from '../../Contexts/CoursesContext'
import axios from 'axios'
import { BaseURL } from '../../Utils/Utils'


function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([]);
  useEffect(() => {
    axios.get(`${BaseURL}courses/popular`).then((response) => {
      setPopularCourses(response.data);
    });
  }, []);
  return (
    // PopularCourses Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-primary" title=" محبوب ترین دوره ها" subTitle=" پرمخاطب ترین و بهترین دوره های سبزلرن " isLink={true} to="courses/1" linkText="مشاهده همه دوره ها" />
       {/* PopularCourses */}
    
       <Slider>
         {
         
         popularCourses.map(({_id, shortName , cover , name , description , creator , price , courseAverageScore}) => {
           return(
             <React.Fragment key={_id}>
                          <SwiperSlide className='rounded-2xl'>
                          <CourseCard shortName={shortName} cover={cover} name={name} description={description} creator={creator} price={price} courseAverageScore={courseAverageScore}/>
                          </SwiperSlide>
                    </React.Fragment>
                )
              })
        }
       </Slider>

    </section>
  )
}

export default PopularCourses


