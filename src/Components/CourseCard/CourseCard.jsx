import { QueryBuilder, Star } from "@mui/icons-material";

import React from "react";
import TomanGreen from "../../assets/Images/svgs/toman-green.svg";
import { Link } from "react-router-dom";

function CourseCard({
  to,
  src,
  isOffer,
  offerPercent,
  category,
  title,
  description,
  teacherLink,
  teacherName,
  time,
  studentCount,
  offerPrice,
  price,
}) {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:border dark:border-gray-700 rounded-2xl">
      {/* Course Img */}
      <div className="relative h-42">
        <Link to={to} className="w-full h-full block">
          <img
            src={src}
            className="block w-full h-full object-cover rounded-2xl"
            alt="ghorbani-dev.ir"
          />
        </Link>
        {/* Offer Tag */}
        {isOffer && (
          <span className="absolute right-2.5 top-2.5 flex-center w-12 h-6 bg-primary text-white rounded-xl font-DanaBold text-sm">
            {offerPercent}
          </span>
        )}
      </div>
      {/* Body */}
      <div className="px-5 pb-3.5 pt-2.5 flex-grow">
        {category.length > 1 ? (
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
        )}
        {/* Title */}
        <h4 className="font-DanaMd min-h-14 max-h-14 line-clamp-2 text-zinc-700 dark:text-white mb-2.5">
          <Link to={to}>{title}</Link>
        </h4>
        {/* Description */}
        {
          description &&    <p className="font-Dana text-sm h-10 line-clamp-2 text-slate-500 dark:text-slate-400">
          {description}
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
              <Link to={teacherLink}>{teacherName}</Link>
            </div>
            <div className="flex items-center gap-x-1">
              <QueryBuilder className="!size-4" />
              <span>{time}</span>
            </div>
          </div>
          {/* Rate */}
          <div className="flex items-center gap-x-1 text-amber-400 text-xs">
            <span className="leading-[1px]">5.0</span>
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
            {studentCount}
          </span>
          <div className="flex flex-col items-start">
            <span className='line-through offer inline-block relative font-Dana text-zinc-400 dark:text-slate-400 text-sm -mb-1.5 -mr-3 h-6'>
              {offerPrice && offerPrice.toLocaleString()}
            </span>
            <span className="flex-center gap-1 font-DanaMd text-xl text-primary space-x-1.5">
              {
              price > 0 ?
              price && price.toLocaleString() :
              <span class="font-Dana text-xl text-primary space-x-1.5">
              رایگان! </span>
              }
              <img src={TomanGreen} alt="ghorbani-dev.ir" className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
