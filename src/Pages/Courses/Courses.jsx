import React, { useEffect, useState } from 'react'
import useTitle from '../../Hooks/useTitle'
import TopPageTitle from '../../Components/TopPageTitle/TopPageTitle'
import SearchFilter from '../../Components/SearchFilter/SearchFilter'
import TopSort from '../../Components/TopSort/TopSort'
import CourseCard from '../../Components/CourseCard/CourseCard'
import Pagination from '../../Components/Pagination/Pagination'
import { Alert } from '@mui/material'
import { BaseURL } from '../../Utils/Utils'
import axios from 'axios'


const courseCount = [
    {
    id: 1,
    title: 'فرانت اند',
    count: 27,
   },
   {
    id: 2,
    title: ' ارتقای مهارت ها',
    count: 12,
   },
   {
    id: 3,
    title: 'بک اند',
    count: 8,
   },
   {
    id: 4,
    title: ' امنیت',
    count: 8,
   },
   {
    id: 5,
    title: ' پایتون',
    count: 6,
   },
   {
    id: 6,
    title: ' مهارت نرم',
    count: 6,
   },
   {
    id: 7,
    title: '  پی اچ پی',
    count: 4,
   },
   {
    id: 8,
    title: ' هوش مصنوعی',
    count: 1,
   },
]

const courses = [
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
    }
]


function Courses() {
const title = useTitle('دوره ها')
  const [allCourses , setAllCourses] = useState([])
const [showItems , setShowItems] = useState([])
const [status , setStatus] = useState('all')
const [filteredAllCourses , setFilteredAllCourses] = useState([])
const [searchValue , setSearchValue] = useState('')
const SearchChangeHandler = (event) => {
   setSearchValue(event.target.value)
   if(searchValue.length >= 1){
   const filterBySearch = allCourses.filter(course => course.name.trim().toLowerCase().includes(event.target.value))
   setFilteredAllCourses(filterBySearch)
   }
}
useEffect(() => {
    axios(`${BaseURL}courses`)
  .then(allCoursesInfo => {
    setAllCourses(allCoursesInfo.data)
   setFilteredAllCourses(allCoursesInfo.data)
 })

} , [])
useEffect(() => {
    switch(status){
     case 'free' : {
         const freeCourses = allCourses.filter(courses => courses.price === 0)
         setFilteredAllCourses(freeCourses)
         break;
     }
     case 'money' : {
         const moneyCourses = allCourses.filter(courses => courses.price !== 0)
         setFilteredAllCourses(moneyCourses)
         break;
     }
     case 'presell' : {
         const presellCourses = allCourses.filter(courses => courses.isComplete === 0)
         setFilteredAllCourses(presellCourses)
         break;
     }
     case 'first' : {
         const reverseCourses = allCourses.slice().reverse()
         setFilteredAllCourses(reverseCourses)
         break;
     }
     case 'cheap' : {
         let originalArray = [...allCourses]
         const cheapCourses = originalArray.sort((a, b) => (a.price > b.price ? 1 : -1))
         setFilteredAllCourses(cheapCourses)
         break;
     }
     case 'expensive' : {
         let originalArray = [...allCourses]
         const expensiveCourses = originalArray.sort((a, b) => (a.price < b.price ? 1 : -1))
         setFilteredAllCourses(expensiveCourses)
         break;
     }
     case 'popular' : {
         const reverseCourses = allCourses.filter(courses => courses.courseAverageScore === 5)
         setFilteredAllCourses(reverseCourses)
         break;
     }
     default : {
        console.log(allCourses)
      setFilteredAllCourses(allCourses)
      break;
     }
    }
 } , [status])
  return (
    <>
        <TopPageTitle title=" دوره ها" bgColor="bg-violet-500" /> 
       {/* Main */}
       <section className='grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 mt-9 sm:mt-25'>
           {/* Aside */}
           {/* <SearchFilter>
            <div className='hidden sm:block px-7 py-6 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
            <span className="inline-block mb-5 text-zinc-700 dark:text-white font-DanaBold text-lg">دسته بندی دوره ها</span>
            <div className='space-y-3.5'>
               {
                courseCount.map(({id , title , count}) => {
                    return(
                        <React.Fragment key={id}>
                            <div className='flex-between'>
                <label className='relative flex items-center select-none gap-x-3 cursor-pointer'>
                    <input type='checkbox' className='checkbox__input absolute w-0 h-0 opacity-0'/>
                    <span className='checkbox__marker'></span>
                    <span className="text-zinc-700 dark:text-white select-none">{title}</span>
                </label>
                <span className="text-sm text-slate-500 dark:text-gray-500">{count}</span>
               </div>
                        </React.Fragment>
                    )
                })
               }
            </div>
            </div>
           </SearchFilter> */}
           <SearchFilter setStatus={setStatus} searchValue={searchValue} setSearchValue={setSearchValue} SearchChangeHandler={SearchChangeHandler} />
           {/* Content */}
           <div className='col-span-1 lg:col-span-2 xl:col-span-3 order-1 lg:order-2'>
           <TopSort BtnOne=" همه دوره ها" BtnTwo="جدیدترین" BtnThree=" ارزان ترین" BtnFour="گران ترین" BtnFive="پرمخاطب‌ها" status={status} setStatus={setStatus}/>
              {/* List */}
              <div className='grid grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
              {
                filteredAllCourses.length > 0 ?
                 showItems.map(({_id, shortName , discount , cover , name , description , creator , price , courseAverageScore}) => {
                return(
                    <React.Fragment key={_id}>
                         <CourseCard shortName={shortName} discount={discount} cover={cover} name={name} description={description} creator={creator} price={price} courseAverageScore={courseAverageScore}/>
                    </React.Fragment>
                )
            }):  <div className='col-span-3'> <Alert severity="info" className="dark:bg-mainSlate dark:text-sky-500">هیچ دوره ای با چنین مشخصات یافت نگردیده است</Alert></div>
              }
          {/* Pagination */}
          {
            filteredAllCourses.length > 0 && <div className='flex-center col-span-3 my-8'>
            <Pagination items={filteredAllCourses} itemsCount={9} pathname='/courses' setShowItems={setShowItems}/>
             </div>
          }
              </div>
           </div>
       </section>
    </>
  )
}

export default Courses
