import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Slider from '../../common/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '../CourseCard/CourseCard'
import { useCourses } from '../../Contexts/CoursesContext'
import axios from 'axios'
import { BaseURL } from '../../Utils/Utils'


function PopularCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get(`${BaseURL}courses`).then((response) => {
      setCourses(response.data);
    });
  }, []);
  const filteredCourses = courses.filter(course => course.price === 0)
  console.log(filteredCourses)
  return (
    // PopularCourses Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-primary" title=" محبوب ترین دوره ها" subTitle=" پرمخاطب ترین و بهترین دوره های سبزلرن " isLink={true} to="courses/1" linkText="مشاهده همه دوره ها" />
       {/* PopularCourses */}
    
       <Slider>
         {
         
         filteredCourses.map(({_id, shortName , cover , name , description , creator , price}) => {
           return(
             <React.Fragment key={_id}>
                          <SwiperSlide className='rounded-2xl'>
                          <CourseCard shortName={shortName} cover={cover} name={name} description={description} creator={creator} price={price}/>
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


