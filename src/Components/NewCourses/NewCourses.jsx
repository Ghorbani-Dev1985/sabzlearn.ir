import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import Slider from '../../common/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '../CourseCard/CourseCard'
import { BaseURL } from '../../Utils/Utils'
import axios from 'axios'



const newCourses = [
  {
      id: 1,
      src: './src/assets/Images/Courses/Course-thumbnail-Dashboard2-1-768x432.webp',
      isOffer : true,
      offerPercent : 60,
      category :  [{
              id: 1,
              categoryTitle: 'فرانت اند',
              categoryLink : ''
      }],
      title: 'پیاده سازی داشبورد های حرفه ای با CSS و JS',
      description: 'این دوره فرصتی فوق‌العاده برای ارتقاء مهارت‌های فرانت اند شماست. با یادگیری از جدیدترین تکنیک‌ها، انیمیشن‌ها ، ابزارهای پیشرفته',
      teacherName: 'مهرشاد براتی',
      time: '07:08',
      studentCount : 282,
      offerPrice: 620000,
      price: 248000
  },
  {
      id: 2,
      src: './src/assets/Images/Courses/ezgif.com-jpg-to-webp-converted-33-1-768x432.webp',
      isOffer : true,
      offerPercent : 60,
      category : [{
          id: 1,
          categoryTitle: ' ارتقای مهارت ها',
          categoryLink : ''
  }],
      title: 'Clean Code برای برنامه نویسان JS',
      description: ' فرق بین یه برنامه‌نویس تازه‌کار و حرفه‌ای نوع دیدگاه و طرز کدنویسیشونه. برنامه‌نویس حرفه‌ای کدی رو می‌نویسه که تست‌پذیر باشه ',
      teacherName: ' محمدامین سعیدی راد',
      time: '02:18',
      studentCount : 232,
      offerPrice: 1100000,
      price: 440000
  },
  {
      id: 3,
      src: './src/assets/Images/Courses/ezgif.com-jpg-to-webp-converted-22-1-768x432.webp',
      isOffer : true,
      offerPercent : 60,
      category : [{
          id: 1,
          categoryTitle: ' بک اند ',
          categoryLink : ''
  }],
      title: 'آموزش حرفه ای NodeJS بدون پیش نیاز',
      description: ' الان و امروز کمتر کسی هست که از بازار کار داغ نود جی اس با خبر نباشه و یکی از ',
      teacherName: ' محمدامین سعیدی راد',
      time: '61:45',
      studentCount : 432,
      offerPrice: 4350000,
      price: 1740000
  },
  {
      id: 4,
      src: './src/assets/Images/Courses/IMAGE-1402-09-30-20_33_36-1-768x432.webp',
      isOffer : true,
      offerPercent : 60,
      category : [{
          id: 1,
          categoryTitle: ' بک اند ',
          categoryLink : ''
  },
  {
      id: 2,
      categoryTitle: ' پی اچ پی ',
      categoryLink : ''
}
],
      title: ' دوره پروژه محور لایووایر (Livewire Master)',
      description: ' دوره لایووایر مستر (Livewire Master) یک دوره‌ی تمام عیار برای فول‌استک فریمورکِ لایووایر است که هدف آن آموزش قدم به ',
      teacherName: '  آرمین هوشمند ',
      time: '00:21',
      studentCount : 24,
      offerPrice: 699000,
      price: 279600
  },
  {
    id: 5,
    src: './src/assets/Images/Courses/IMAGE-1402-09-30-20_33_36-1-768x432.webp',
    isOffer : true,
    offerPercent : 60,
    category : [{
        id: 1,
        categoryTitle: ' بک اند ',
        categoryLink : ''
},
{
    id: 2,
    categoryTitle: ' پی اچ پی ',
    categoryLink : ''
}
],
    title: ' دوره پروژه محور لایووایر (Livewire Master)',
    description: ' دوره لایووایر مستر (Livewire Master) یک دوره‌ی تمام عیار برای فول‌استک فریمورکِ لایووایر است که هدف آن آموزش قدم به ',
    teacherName: '  آرمین هوشمند ',
    time: '00:21',
    studentCount : 24,
    offerPrice: 699000,
    price: 279600
}

]

function NewCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get(`${BaseURL}courses`).then((response) => {
      setCourses(response.data);
    });
  }, []);
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
    
       <Slider SwiperNextBtnID="#NewCoursesSwiperNextBtn" SwiperPrevBtnID="#NewCoursesSwiperPrevBtn" >
         {
         
         courses.slice(0 , 6).map(({_id, shortName , cover , name , description , creator , price , courseAverageScore}) => {
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

export default NewCourses


