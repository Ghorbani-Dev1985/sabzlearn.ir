import React, { useEffect, useState } from 'react'
import useTitle from '../../Hooks/useTitle'
import TopPageTitle from '../../Components/TopPageTitle/TopPageTitle'
import SearchFilter from '../../Components/SearchFilter/SearchFilter'
import TopSort from '../../Components/TopSort/TopSort'
import CourseCard from '../../Components/CourseCard/CourseCard'
import Pagination from '../../Components/Pagination/Pagination'
import { Alert } from '@mui/material'
import { useCourses } from '../../Contexts/CoursesContext';
import CourseSkeleton from '../../common/CourseSkeleton/CourseSkeleton';

function Courses() {
const title = useTitle('دوره ها')
const {courses , courseIsShowLoading} = useCourses()
const [showItems , setShowItems] = useState([])
const [status , setStatus] = useState('all')
const [filteredAllCourses , setFilteredAllCourses] = useState([])
const [searchValue , setSearchValue] = useState('')

const SearchChangeHandler = (event) => {
   setSearchValue(event.target.value)
   if(searchValue.length >= 1){
   const filterBySearch = courses.filter(course => course.name.trim().toLowerCase().includes(event.target.value))
   setFilteredAllCourses(filterBySearch)
   }
}

useEffect(() => {
    setFilteredAllCourses(courses)
} , [courses])


useEffect(() => {
    switch(status){
     case 'free' : {
         const freeCourses = courses.filter(courses => courses.price === 0)
         setFilteredAllCourses(freeCourses)
         break;
     }
     case 'money' : {
         const moneyCourses = courses.filter(courses => courses.price !== 0)
         setFilteredAllCourses(moneyCourses)
         break;
     }
     case 'presell' : {
         const presellCourses = courses.filter(courses => courses.isComplete === 0)
         setFilteredAllCourses(presellCourses)
         break;
     }
     case 'first' : {
         const reverseCourses = courses.slice().reverse()
         setFilteredAllCourses(reverseCourses)
         break;
     }
     case 'cheap' : {
         let originalArray = [...courses]
         const cheapCourses = originalArray.sort((a, b) => (a.price > b.price ? 1 : -1))
         setFilteredAllCourses(cheapCourses)
         break;
     }
     case 'expensive' : {
         let originalArray = [...courses]
         const expensiveCourses = originalArray.sort((a, b) => (a.price < b.price ? 1 : -1))
         setFilteredAllCourses(expensiveCourses)
         break;
     }
     case 'popular' : {
         const reverseCourses = courses.filter(courses => courses.courseAverageScore === 5)
         setFilteredAllCourses(reverseCourses)
         break;
     }
     default : {
      setFilteredAllCourses(courses)
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
           <SearchFilter setStatus={setStatus} searchValue={searchValue} setSearchValue={setSearchValue} SearchChangeHandler={SearchChangeHandler} />
           {/* Content */}
           <div className='col-span-1 lg:col-span-2 xl:col-span-3 order-1 lg:order-2'>
           <TopSort BtnOne=" همه دوره ها" BtnTwo="جدیدترین" BtnThree=" ارزان ترین" BtnFour="گران ترین" BtnFive="پرمخاطب‌ها" status={status} setStatus={setStatus}/>
              {/* List */}
              <div className='grid grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
                {
                    courseIsShowLoading ? <CourseSkeleton listsToRender={9}/> : 
                filteredAllCourses.length > 0 ?
                 showItems.map(({_id, shortName , discount , cover , name , description , creator , price , courseAverageScore}) => {
                return(
                    <React.Fragment key={_id}>
                         <CourseCard shortName={shortName} discount={discount} cover={cover} name={name} description={description} creator={creator} price={price} courseAverageScore={courseAverageScore}/>
                    </React.Fragment>
                )
            })
            
            :  <div className='col-span-3'> <Alert severity="info" className="dark:bg-mainSlate dark:text-sky-500">هیچ دوره ای با چنین مشخصات یافت نگردیده است</Alert></div>
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
