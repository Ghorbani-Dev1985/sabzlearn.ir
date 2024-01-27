import { Search } from '@mui/icons-material'
import React from 'react'
import CourseCard from '../../Components/CourseCard/CourseCard'

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
  return (
    <>
  {/* Category Title */}
  <h2 className='flex items-center gap-x-3 sm:gap-x-5 w-min mx-auto mt-15 dark:text-white font-MorabbaBold text-4xl sm:text-6xl whitespace-nowrap'>
  <span className='block w-7 sm:w-10 h-2.5 bg-rose-500 shrink-0 rounded-sm'></span>
    فرانت اند
</h2>
{/* Main Section */}
<section className='grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 mt-9 sm:mt-25'>
     {/* Sidebar */}
     <aside className='sticky top-36 space-y-5'>
        {/* Search Box */}
        <form className='space-y-5'>
         <div className='h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
            <div className='h-full flex-between text-slate-500 dark:text-gray-500'>
             <input type='text' className='w-full bg-transparent dark:bg-transparent outline-none text-sm font-dana pr-7 border-none' placeholder='در بین دوره ها جستجو کنید'/>
             <button type='submit' className='mr-4 ml-6'>
                 <Search className='size-7'/>
             </button>
            </div>
         </div>
         {/* Toggle Box */}
         <div className='hidden sm:grid grid-cols-2 lg:grid-cols-1 gap-5'>
            {/* Free Course */}
             <div className='px-7 h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
                <div className='flex-between h-full'>
                  <span className='text-sm text-zinc-700 dark:text-white select-none'>فقط دوره های رایگان</span>
                  <label className='relative cursor-pointer select-none'>
                      <input type='checkbox' className='toggle__input absolute h-0 w-0 opacity-0'/>
                      <span className='toggle__select'></span>
                  </label>
                </div>
             </div>
            {/* Presell Course */}
            <div className='px-7 h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
              <div className='flex-between h-full'>
                <span className='text-sm text-zinc-700 dark:text-white select-none'>در حال پیش فروش</span>
                <label className='relative cursor-pointer select-none'>
                      <input type='checkbox' className='toggle__input absolute h-0 w-0 opacity-0'/>
                      <span className='toggle__select'></span>
                  </label>
              </div>
            </div>
         </div>
        </form>
     </aside>
     {/* Main Content */}
     <section className='col-span-1 lg:col-span-2 xl:col-span-3 order-1 lg:order-2'>
        {/* Sort In Mobile */}
        <div className='flex sm:hidden items-center gap-3.5 mb-7'>
          <div className='flex items-center justify-center gap-x-2 w-1/2 py-2 px-4 text-sm text-zinc-700 dark:text-white bg-white dark:bg-gray-800 rounded-xl select-none'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>
 <span>فیلتر</span>
          </div>
          <div className='flex-center gap-x-2 w-1/2 py-2 px-4 text-sm text-zinc-700 dark:text-white bg-white dark:bg-gray-800 rounded-xl select-none'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25.811 17.879" className="size-6 text-gray-500" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
        <path d="M.556,16.379V0" transform="translate(4.349)"/>
        <path d="M9.809,0,4.9,4.927,0,0" transform="translate(0 11.452)"/>
        <path d="M5.5.5H0" transform="translate(15.316 10.415)"/>
        <path d="M7.322.5H0" transform="translate(15.316 4.883)"/>
        <path d="M3.314.5H0" transform="translate(15.316 15.708)"/>
        <path d="M8.684.5H0" transform="translate(15.316 0.072)"/>
    </svg>
     <span>همه دوره‌ ها</span>
          </div>
        </div>
          {/* Sort In Desktop */}
          <div className='hidden sm:flex items-center px-7 mb-5 h-17 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl'>
               <div className='flex-center lg:justify-start gap-4 text-sm'>
            <span className='flex items-center shrink-0 gap-x-2.5 dark:text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25.811 17.879" className="size-5" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
        <path d="M.556,16.379V0" transform="translate(4.349)"/>
        <path d="M9.809,0,4.9,4.927,0,0" transform="translate(0 11.452)"/>
        <path d="M5.5.5H0" transform="translate(15.316 10.415)"/>
        <path d="M7.322.5H0" transform="translate(15.316 4.883)"/>
        <path d="M3.314.5H0" transform="translate(15.316 15.708)"/>
        <path d="M8.684.5H0" transform="translate(15.316 0.072)"/>
    </svg>
       <span>مرتب سازی</span>
            </span>
            <div className='flex items-center flex-wrap'>
                <button className='button-sort font-DanaMd bg-gray-100 text-zinc-700'>همه دوره ها</button>
                <button className='button-sort'>  ارزان ترین</button>
                <button className='button-sort'>  گران ترین</button>
                <button className='button-sort'>  پرمخاطب‌ها</button>
            </div>
               </div>
          </div>
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