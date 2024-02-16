import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import Slider from '../../common/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '../CourseCard/CourseCard'
import axios from 'axios'
import { BaseURL } from '../../Utils/Utils'


function PresellCourses() {
  const [presellCourses, setPresellCourses] = useState([]);
  useEffect(() => {
    axios.get(`${BaseURL}courses/presell`).then((response) => {
      setPresellCourses(response.data);
    });
  }, []);
  return (
    // PresellCourses Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-primary" title=" در حال پیش فروش " subTitle=" دوره هایی که قراره برگزار بشن " isLink={false} />
       {/* PresellCourses */}
    
       <Slider>
         {
         
         presellCourses.map(({_id, shortName , discount , categoryID , cover , name , description , creator , price , courseAverageScore}) => {
           return(
             <React.Fragment key={_id}>
                          <SwiperSlide className='rounded-2xl'>
                          <CourseCard shortName={shortName} discount={discount} categoryTitle={categoryID.title} categoryShortName={categoryID.name} cover={cover} name={name} description={description} creator={creator} price={price} courseAverageScore={courseAverageScore}/>
                          </SwiperSlide>
                    </React.Fragment>
                )
              })
        }
       </Slider>

    </section>
  )
}

export default PresellCourses


