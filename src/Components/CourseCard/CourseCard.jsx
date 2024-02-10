import { QueryBuilder, Star } from "@mui/icons-material";

import React, { useState } from "react";
import TomanGreen from "../../assets/Images/svgs/toman-green.svg";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify'

function CourseCard(
  {id, shortName , cover , name , description , creator , price , courseAverageScore}) {
  const [isImgLoaded , setIsImgLoaded] = useState(true)
  return (
    
      isImgLoaded ? <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:xl:border dark:border-gray-700 rounded-2xl">
      {/* Course Img */}
      <div className="relative h-42">
        <Link to={`/course/${shortName}`} className="w-full h-full block">
          <img
            src={`../../../Backend/public/courses/covers/${cover}`}
            className="block w-full h-full max-h-[149px] object-cover rounded-2xl"
            alt="ghorbani-dev.ir"
          />
        </Link>
        {/* Offer Tag */}
        {/* {isOffer && (
          <span className="absolute right-2.5 top-2.5 flex-center w-12 h-6 bg-primary text-white rounded-xl font-DanaBold text-sm">
            {offerPercent}
          </span>
        )} */}
      </div>
      {/* Body */}
      <div className="px-5 pb-3.5 pt-2.5 flex-grow">
        {/* {category.length > 1 ? (
          category.map(({ id, categoryTitle, categoryLink }) => {
            return (
              <React.Fragment key={id}>
                <Link
                  to={categoryLink}
                  className="inline-flex items-center justify-center text-xs !text-sky-500 dark:text-yellow-400 bg-sky-500/10 dark:bg-yellow-400/10 py-1
                  px-1.5 mx-1 mb-2.5 rounded"
                >
                  {categoryTitle}
                </Link>
              </React.Fragment>
            );
          })
        ) : (
          <Link
            to={category[0].categoryLink}
            className="inline-flex items-center justify-center text-xs text-sky-500 dark:text-yellow-400 bg-sky-500/10 dark:bg-yellow-400/10 py-1 px-1.5 mb-2.5 rounded"
          >
            {category[0].categoryTitle}
          </Link>
        )} */}
         <Link
                  to=""
                  className="inline-flex items-center justify-center text-xs !text-sky-500 dark:text-yellow-400 bg-sky-500/10 dark:bg-yellow-400/10 py-1
                  px-1.5 mx-1 mb-2.5 rounded"
                >
                 فرانت اند
                </Link>
        {/* Title */}
        <h4 className="font-DanaMd min-h-14 max-h-14 line-clamp-2 text-zinc-700 dark:text-white mb-2.5">
          <Link to={`/course/${shortName}`}>{name}</Link>
        </h4>
        {/* Description */}
        {
          description &&    <p className="font-Dana text-sm h-10 min-h-10 line-clamp-2 text-slate-500 dark:text-slate-400">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
        </p>
        }
     
      </div>
      {/* Footer */}
      <div className="px-5 pb-2">
        <div className="flex-between pb-3 border-b border-b-gray-100 dark:border-b-gray-700">
          {/* Teacher & Time */}
          <div className="flex gap-2.5 flex-wrap text-slate-500 dark:text-slate-400 text-xs">
            <div className="flex items-center gap-x-1 hover:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <Link to="">{creator}</Link>
            </div>
            <div className="flex items-center gap-x-1">
              <QueryBuilder className="!size-4" />
              <span>22:40</span>
            </div>
          </div>
          {/* Rate */}
          <div className="flex items-center gap-x-1 text-amber-400 text-xs">
            <span className="leading-[1px]">{courseAverageScore}.0</span>
            <Star className="!size-4" />
          </div>
        </div>
        {/* Student & Price */}
        <div className="flex items-end justify-between mt-1.5">
          <span className="flex items-center gap-x-1.5 text-zinc-700 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
           236
          </span>
          <div className="flex flex-col items-start">
            <span className='line-through offer inline-block relative font-Dana text-zinc-400 dark:text-slate-400 text-sm -mb-1.5 -mr-3 h-6'>
              {/* {offerPrice && offerPrice.toLocaleString()} */}
            </span>
            <span className="flex-center gap-1 font-DanaMd text-xl text-primary space-x-1.5">
              {
              price > 0 ?
             <>{price && price.toLocaleString()} <img src={TomanGreen} alt="ghorbani-dev.ir" className="size-4" /> </> :
              <span className="font-Dana text-xl text-primary space-x-1.5">
              رایگان! </span>
              }
              
            </span>
          </div>
        </div>
      </div>
    </div> : <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg>
    </div>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="flex items-center mt-4">
       <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    </div>
    <span className="sr-only">Loading...</span>
</div> 

  );
}

export default CourseCard;
