import React, { useState } from "react";
import useTitle from "../../Hooks/useTitle";
import TopPageTitle from "../../Components/TopPageTitle/TopPageTitle";
import { ArrowLeft, KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import TopSort from "../../Components/TopSort/TopSort";
import BlogCard from "../../Components/BlogCard/BlogCard";
import BlogCategory from "../../Components/BlogCategory/BlogCategory";
import { useBlogs } from "../../Contexts/BlogsContext";
import Pagination from "../../Components/Pagination/Pagination";



const blogs = [
  {
    id: 1,
    to: "",
    src: "./src/assets/Images/ArticlesImg/what-is-backend-1-768x512.webp",
    title: "بک اند چیست؟",
    description:
      "بک اند چیست؟ این سوالی است که ممکن است به ذهن اکثر افراد بیاید؛ بک اند یک شغل در زمینه برنامه نویسی است که در این مقاله قصد داریم پس",
    authorLink: "",
    authorName: "ارمیا مزرعه",
    date: "1402/11/05",
  },
  {
    id: 2,
    to: "",
    src: "./src/assets/Images/ArticlesImg/The-difference-between-TypeScript-and-JavaScript-1-768x512.webp",
    title: " تفاوت تایپ اسکریپت و جاوا اسکریپت",
    description:
      "طبق مطالعات انجام شده، تایپ اسکریپت دومین زبان محبوب در میان توسعه‌دهندگان است و جاوا اسکریپت در رقابتی پیاپی با این زبان برنامه‌نویسی در رتبه سوم قرار دارد. این محبوبیت",
    authorLink: "",
    authorName: " کامل بهرامی",
    date: "1402/11/04",
  },
  {
    id: 3,
    to: "",
    src: "./src/assets/Images/ArticlesImg/games-made-with-python-1-768x512.webp",
    title: " بازی های ساخته شده با پایتون",
    description:
      "ساخت بازی با پایتون یکی دیگر از مباحثی است که این روزها سروصدای زیادی کرده؛ در واقع بازی های ساخته شده با پایتون آنقدر هم که فکر می‌کنید انگشت شمار",
    authorLink: "",
    authorName: " ارمیا مزرعه ",
    date: "1402/11/04",
  },
  {
    id: 4,
    to: "",
    src: "./src/assets/Images/ArticlesImg/api-in-javascript-1-768x512.webp",
    title: " آموزش کار با API در جاوا اسکریپت",
    description:
      "توانایی برقراری تماس‌های API در جاوا اسکریپت مهارتی اساسی برای توسعه‌دهندگان وب در دنیای برنامه نویسی است که به آن‌ها اجازه می‌دهد داده‌ها را از منابع خارجی بازیابی کرده و",
    authorLink: "",
    authorName: " کامل بهرامی ",
    date: "1402/11/02",
  },
];

function Blogs() {
  const title = useTitle(" وبلاگ - سبزلرن");
  const {blogs} = useBlogs()
 
  const [showItems , setShowItems] = useState([])
  return (
    <>
      {/* Title */}
      <TopPageTitle title=" وبلاگ" bgColor="bg-amber-400" />
      {/* Main Section */}
      <section className="grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 mt-12 sm:mt-25">
        {/* Sidebar */}
        <aside className="sticky top-36 space-y-5">
          {/* Category */}
        <BlogCategory />
        </aside>
        {/* Content */}
        <section className="col-span-1 lg:col-span-2 xl:col-span-3">
          {/* Sort */}
          <TopSort
            BtnOne=" عادی"
            BtnTwo="جدید ترین"
            BtnThree=" قدیمی ترین"
            BtnFour="پرنظر ها"
          />
          {/* Card */}
          <div className="grid grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {showItems.map(
              ({ _id, shortName, cover, title, body, creator, createdAt }) => {
                return (
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
                );
              }
            )}
             <div className='flex-center col-span-3 my-8'>
            <Pagination items={publishedBlogsFilter} itemsCount={3} pathname="/blogs" setShowItems={setShowItems}/>
             </div>
          </div>
          {/* {
            blogs.length > 6 ? <div className="show-more flex justify-center items-center w-52 h-14 mt-10 mx-auto bg-gray-200 dark:bg-gray-700 text-zinc-700 dark:text-white text-xl rounded-full cursor-pointer transition-colors">
            <div className="show-more__content space-x-2">
                مشاهده بیشتر
            <KeyboardArrowDown className="size-6"/>
            </div>
            <svg className="show-more__loading hidden w-6 h-6 animate-spin text-white dark:text-gray-600 fill-zinc-700 dark:fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
            </svg>
        </div> : <div className="text-zinc-700 dark:text-white font-danaLight mt-7 leading-7 text-center">
                        تمام مطالب نمایش داده شده است.
                    </div>
          } */}
        </section>
      </section>
    </>
  );
}

export default Blogs;
