import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Pagination({items , itemsCount , pathname , setShowItems}) {
    const {page} = useParams()
    const [pagesCount , setPagesCount] = useState(null)
    const [pathIndex , setPathIndex] = useState(null)
    useEffect(()=>{
        let endIndex = itemsCount * page
        let startIndex = endIndex - itemsCount
        let paginatedItems = items.slice(startIndex , endIndex)
        setShowItems(paginatedItems)
        let pagesNumber = Math.ceil(items.length / itemsCount)
        setPagesCount(pagesNumber)
    }, [page , items])
  return (
    <nav aria-label="Page navigation example">
  <ul className="flex items-center -space-x-px h-8 text-sm">
    <li>
      <Link to={`${pathname}/${+page - 1}`} className="flex-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">قبلی</span>
        <ChevronRight />
      </Link>
    </li>
    {
        Array(pagesCount).fill(0).map((item , index) => {
            return(
            <li key={index}>
            <Link to={`${pathname}/${index + 1}`} className={`${+page === index + 1 ? 'z-10 flex-center px-3 h-8 leading-tight text-sky-600 border border-sky-300 bg-sky-50 hover:bg-sky-100 hover:text-sky-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>{index + 1}</Link>
          </li>
            )
        })
    }
    <li>
      <Link to={`${pathname}/${+page +1}`} className="flex-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">بعدی</span>
        <ChevronLeft />
      </Link>
    </li>
  </ul>
</nav>
  )
}

export default Pagination
