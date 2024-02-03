import { Search, VerticalAlignCenterOutlined } from '@mui/icons-material'
import React, { useEffect } from 'react'
import CourseCard from '../../Components/CourseCard/CourseCard'
import TopSort from '../../Components/TopSort/TopSort'
import useTitle from '../../Hooks/useTitle'
import TopPageTitle from '../../Components/TopPageTitle/TopPageTitle'
import SearchFilter from '../../Components/SearchFilter/SearchFilter'
import useFetch from '../../Hooks/useFetch'
import { useParams } from 'react-router-dom'
import { BaseURL } from '../../Utils/Utils'
import axios from 'axios'

const categoryCourses = [
  {
      id: 1,
      src: '../src/assets/Images/Courses/Course-thumbnail-Dashboard2-1-768x432.webp',
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
      src: '../src/assets/Images/Courses/ezgif.com-jpg-to-webp-converted-33-1-768x432.webp',
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
      src: '../src/assets/Images/Courses/ezgif.com-jpg-to-webp-converted-22-1-768x432.webp',
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
      src: '../src/assets/Images/Courses/IMAGE-1402-09-30-20_33_36-1-768x432.webp',
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


function Category() {
 const {categoryName} = useParams()
//  const {datas : category} = useFetch(`courses/category/${categoryName}` , false)
//   console.log(category)
//   const title = useTitle("فرانت اند - سبزلرن")
useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    const courseID = { courseID: '635f05d6fd9e8fcba0d2c909'}
     fetch(`http://localhost:5000/v1/courses/category/${categoryName}` , null , null )
    .then(res => res.json())
   .then(categoryInfo => {
    console.log(categoryInfo)
   // document.title = courseInfo.data.name
  })

} , []);
  return (
    <>
  {/* Category Title */}
   <TopPageTitle title="فرانت اند" bgColor="bg-rose-500" /> 
{/* Main Section */}
<section className='grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 mt-9 sm:mt-25'>
     {/* Sidebar */}
     <SearchFilter />
     {/* Main Content */}
     <section className='col-span-1 lg:col-span-2 xl:col-span-3 order-1 lg:order-2'>
         {/* Sort */}
          <TopSort BtnOne=" همه دوره ها" BtnTwo="ارزان ترین" BtnThree=" گران ترین" BtnFour="پرمخاطب‌ها" />
          {/* Course List */}
          <div className='grid grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
        {
            categoryCourses.map(({id, src , isOffer , offerPercent , category , title , description , teacherName , time , studentCount , offerPrice , price}) => {
                return(
                    <React.Fragment key={id}>
                        <CourseCard src={src} isOffer={isOffer} offerPercent={offerPercent} category={category} title={title} description={description} teacherName={teacherName} time={time} studentCount={studentCount} offerPrice={offerPrice} price={price}/>
                    </React.Fragment>
                )
            })
        }
     </div>
     </section>
</section>
    </>
  )
}

export default Category