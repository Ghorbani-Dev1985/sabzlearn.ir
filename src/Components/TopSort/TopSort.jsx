import React, { useState } from "react";
import { Close, DoneOutlined } from "@mui/icons-material";
import { Backdrop, Divider } from "@mui/material";
import { Link } from "react-router-dom";

function TopSort({ children, BtnOne, BtnTwo, BtnThree, BtnFour }) {
  const [showMobileFilter , setShowMobileFilter] = useState(false)
  const [showMobileSort , setShowMobileSort] = useState(false)
  return (
    <>
      {/* Sort In Mobile */}
      <div className="flex sm:hidden items-center gap-3.5 mb-7">
        <div onClick={() => setShowMobileFilter((prev) => !prev)} className="flex items-center justify-center gap-x-2 w-1/2 py-2 px-4 text-sm text-zinc-700 dark:text-white bg-white dark:bg-gray-800 rounded-xl select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <span>فیلتر</span>
        </div>
        {
          showMobileFilter &&  <MobileFilter showMobileFilter={showMobileFilter} setShowMobileFilter={setShowMobileFilter}/>
        }
       
        <div onClick={() => setShowMobileSort((prev) => !prev)} className="flex-center gap-x-2 w-1/2 py-2 px-4 text-sm text-zinc-700 dark:text-white bg-white dark:bg-gray-800 rounded-xl select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 25.811 17.879"
            className="size-6 text-gray-500"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
          >
            <path d="M.556,16.379V0" transform="translate(4.349)" />
            <path d="M9.809,0,4.9,4.927,0,0" transform="translate(0 11.452)" />
            <path d="M5.5.5H0" transform="translate(15.316 10.415)" />
            <path d="M7.322.5H0" transform="translate(15.316 4.883)" />
            <path d="M3.314.5H0" transform="translate(15.316 15.708)" />
            <path d="M8.684.5H0" transform="translate(15.316 0.072)" />
          </svg>
          <span>همه دوره‌ ها</span>
        </div>
      </div>
      {
        showMobileSort && <MobileSort showMobileSort={showMobileSort} setShowMobileSort={setShowMobileSort}/>
      }
        
      {/* Sort In Desktop */}
      <div className="hidden sm:flex items-center px-7 mb-5 h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl">
        <div className="flex-center lg:justify-start gap-4 text-sm">
          <span className="flex items-center shrink-0 gap-x-2.5 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 25.811 17.879"
              className="size-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
            >
              <path d="M.556,16.379V0" transform="translate(4.349)" />
              <path
                d="M9.809,0,4.9,4.927,0,0"
                transform="translate(0 11.452)"
              />
              <path d="M5.5.5H0" transform="translate(15.316 10.415)" />
              <path d="M7.322.5H0" transform="translate(15.316 4.883)" />
              <path d="M3.314.5H0" transform="translate(15.316 15.708)" />
              <path d="M8.684.5H0" transform="translate(15.316 0.072)" />
            </svg>
            <span>مرتب سازی</span>
          </span>
          <div className="flex items-center flex-wrap">
            <button className="button-sort font-DanaMd bg-gray-100 dark:bg-mainSlate text-zinc-700 dark:text-white">
              {BtnOne}
            </button>
            <button className="button-sort"> {BtnTwo}</button>
            <button className="button-sort"> {BtnThree}</button>
            <button className="button-sort"> {BtnFour}</button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}


const MobileFilter = ({showMobileFilter , setShowMobileFilter}) => {
  return (
    <div className="filter">
      <div className="filter__header">
        <div className="filter__head-title">
          <button onClick={() => setShowMobileFilter((prev) => !prev)} className="flex-center text-gray-500">
            <Close className="size-6" />
          </button>
          <span className="font-Dana text-lg text-zinc-700 dark:text-white">
            فیلتر
          </span>
        </div>
        <button className="filter__clean-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          حذف فیلتر ها
        </button>
      </div>
      <div className="px-6">
        {/* Free Course */}
            <div className='flex-between h-full'>
              <span className='text-sm text-zinc-700 dark:text-white select-none'>فقط دوره های رایگان</span>
              <label className='relative cursor-pointer select-none'>
                  <input type='checkbox' className='toggle__input absolute h-0 w-0 opacity-0'/>
                  <span className='toggle__select'></span>
              </label>
            </div>
          <Divider className="border-gray-200 dark:border-gray-700"/>
        {/* Presell Course */}
          <div className='flex-between h-full'>
            <span className='text-sm text-zinc-700 dark:text-white select-none'>در حال پیش فروش</span>
            <label className='relative cursor-pointer select-none'>
                  <input type='checkbox' className='toggle__input absolute h-0 w-0 opacity-0'/>
                  <span className='toggle__select'></span>
              </label>
          </div>
      </div>
      <div className="filter__footer">
        <button className="filter__submit-btn">اعمال فیلتر ها</button>
      </div>
    </div>
  );
};

export { MobileFilter };


const MobileSort = ({showMobileSort , setShowMobileSort}) => {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showMobileSort}
        onClick={() => setShowMobileSort((prev) => !prev)}
      >
       <div className="bottom-sheet bottom-sheet--open">
       <div className="bottom-sheet__header">
         <button className="bottom-sheet__close-btn"> <Close className="size-6" /></button>
         <span className="bottom-sheet__name">مرتب سازی بر اساس</span>
       </div>
       <div className="bottom-sheet__body">
      <Link className="bottom-sheet__item bottom-sheet__item--selected"><span>همه دوره ها</span> <DoneOutlined className="size-5" /> </Link>
      <Link className="bottom-sheet__item"><span>  ارزان ترین</span> <DoneOutlined className="hidden size-5"/> </Link>
      <Link className="bottom-sheet__item"><span>  گران ترین</span> <DoneOutlined className="hidden size-5"/> </Link>
      <Link className="bottom-sheet__item"><span>  پرمخاطب ها</span> <DoneOutlined className="hidden size-5"/> </Link>
       </div>
       </div>
      </Backdrop>
  
  )
}

export {MobileSort};


export default TopSort;