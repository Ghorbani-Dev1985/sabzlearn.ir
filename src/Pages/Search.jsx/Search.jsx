import { VerticalAlignCenterOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import CourseCard from '../../Components/CourseCard/CourseCard'
import TopSort from '../../Components/TopSort/TopSort'
import useTitle from '../../Hooks/useTitle'
import TopPageTitle from '../../Components/TopPageTitle/TopPageTitle'
import SearchFilter from '../../Components/SearchFilter/SearchFilter'
import { useParams } from 'react-router-dom'
import { Alert } from '@mui/material'
import Pagination from '../../Components/Pagination/Pagination'
import BlogCard from '../../Components/BlogCard/BlogCard'
import ApiRequest from '../../Services/Axios/Configs/Config'


function Search() {
 const title = useTitle('نتیجه جستجو')
 const {value} = useParams()
 const [coursesResult , setCoursesResult] = useState([])
 const [blogsResult , setBlogsResult] = useState([])
 const [showItems , setShowItems] = useState([])
 const [status , setStatus] = useState('all')
 const [filteredCourses , setFilteredCourses] = useState([])
 const [searchValue , setSearchValue] = useState('')
 const SearchChangeHandler = (event) => {
    setSearchValue(event.target.value)
    if(searchValue.length >= 1){
    const filterBySearch = coursesResult.filter(course => course.name.trim().toLowerCase().includes(event.target.value))
    setFilteredCourses(filterBySearch)
    }
 }
useEffect(() => {
    const ResponseResult = ApiRequest(`search/${value}`)
   .then(searchResult => {
     console.log(searchResult)
    setCoursesResult(searchResult.data.allResultCourses)
    setBlogsResult(searchResult.data.allResultArticles)
    setFilteredCourses(searchResult.data.allResultCourses)
  })

} , [value])

console.log(filteredCourses, showItems)
useEffect(() => {
   switch(status){
    case 'free' : {
        const freeCourses = coursesResult.filter(courses => courses.price === 0)
        setFilteredCourses(freeCourses)
        break;
    }
    case 'money' : {
        const moneyCourses = coursesResult.filter(courses => courses.price !== 0)
        setFilteredCourses(moneyCourses)
        break;
    }
    case 'presell' : {
        const presellCourses = coursesResult.filter(courses => courses.isComplete === 0)
        setFilteredCourses(presellCourses)
        break;
    }
    case 'first' : {
        const reverseCourses = coursesResult.slice().reverse()
        setFilteredCourses(reverseCourses)
        break;
    }
    case 'cheap' : {
        let originalArray = [...coursesResult]
        const cheapCourses = originalArray.sort((a, b) => (a.price > b.price ? 1 : -1))
        setFilteredCourses(cheapCourses)
        break;
    }
    case 'expensive' : {
        let originalArray = [...coursesResult]
        const expensiveCourses = originalArray.sort((a, b) => (a.price < b.price ? 1 : -1))
        setFilteredCourses(expensiveCourses)
        break;
    }
    case 'popular' : {
        const reverseCourses = coursesResult.filter(courses => courses.courseAverageScore === 5)
        setFilteredCourses(reverseCourses)
        break;
    }
    default : {
     setFilteredCourses(coursesResult)
     break;
    }
   }
} , [status])
 
  return (
    <>
  {/* Category Title */}
   <TopPageTitle title='جستجو در دوره ها' countCourse={filteredCourses.length} bgColor="bg-sky-500" /> 

{/* Main Section */}
<section className='grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 my-16 sm:mt-25'>
     {/* Sidebar */}
     <SearchFilter setStatus={setStatus} searchValue={searchValue} setSearchValue={setSearchValue} SearchChangeHandler={SearchChangeHandler} />
     {/* Main Content */}
     <section className='col-span-1 lg:col-span-2 xl:col-span-3 order-1 lg:order-2'>
         {/* Sort */}
          <TopSort BtnOne=" همه دوره ها" BtnTwo="جدیدترین" BtnThree=" ارزان ترین" BtnFour="گران ترین" BtnFive="پرمخاطب‌ها" status={status} setStatus={setStatus}/>
          {/* Course List */}
          <div className='grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-5'>
        {
            filteredCourses.length > 0 ?  
            filteredCourses.map(({_id, shortName , cover , name , description , creator , price , courseAverageScore}) => {
                return(
                    <React.Fragment key={_id}>
                         <CourseCard shortName={shortName} cover={cover} name={name} description={description} creator={creator} price={price} courseAverageScore={courseAverageScore}/>
                    </React.Fragment>
                )
            })
        : <div className='col-span-3'> <Alert severity="info" className="dark:bg-mainSlate dark:text-sky-500">هیچ دوره ای با چنین مشخصات یافت نگردیده است</Alert></div>
        }
       
       
     </div>
     </section>
</section>
<TopPageTitle title='جستجو در مقالات' countCourse={blogsResult.length} bgColor="bg-sky-500" /> 
<div className='grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-5 mt-16'>
{
            filteredCourses.length > 0 ?  
            blogsResult.map(({ _id, shortName, cover, title, body, creator, createdAt }) => {
                return(
                    <React.Fragment key={_id}>
                         <BlogCard
                  shortName={shortName}
                  cover={cover}
                  title={title}
                  body={body}
                  creatorName={creator.name}
                  createdAt={createdAt}
                />
                    </React.Fragment>
                )
            })
        : <div className='col-span-3'> <Alert severity="info" className="dark:bg-mainSlate dark:text-sky-500">هیچ مقاله ای با چنین مشخصات یافت نگردیده است</Alert></div>
        }
        </div>
    </>
  )
}

export default Search