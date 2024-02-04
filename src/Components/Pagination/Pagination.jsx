import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Pagination({items , itemsCount , pathname , setShowCourses}) {
    const {page} = useParams()
    const [pagesCount , setPagesCount] = useState(null)

    useEffect(()=>{
        let endIndex = itemsCount * page
        let startIndex = endIndex - itemsCount
        let paginatedItems = items.slice(startIndex , endIndex)
        setShowCourses(paginatedItems)
        let pagesNumber = Math.ceil(items.length / itemsCount)
        setPagesCount(pagesNumber)
    }, [page , items])
    
  return (
    <nav aria-label="Page navigation example">
  <ul className="flex items-center -space-x-px h-8 text-sm">
    <li>
      <a href="#" className="flex-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">قبلی</span>
        <ChevronRight />
      </a>
    </li>
    {
        Array(pagesCount).fill(0).map((item , index) => {
            <li>
            <Link className="flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index + 1}</Link>
          </li>
        })
    }
    {/* <li>
      <a href="#" className="flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" className="flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="z-10 flex-center px-3 h-8 leading-tight text-sky-600 border border-sky-300 bg-sky-50 hover:bg-sky-100 hover:text-sky-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" className="flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" className="flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li> */}
    <li>
      <a href="#" className="flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">بعدی</span>
        <ChevronLeft />
      </a>
    </li>
  </ul>
</nav>
  )
}

export default Pagination
