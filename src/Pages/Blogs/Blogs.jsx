import React, { useEffect, useState } from "react";
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
  const [filteredPublishBlogs , setFilteredPublishBlogs] = useState([])
  useEffect(() => {
    const filterPublishedBlogs = blogs.filter(blog => blog.publish === 1)
    setFilteredPublishBlogs(filterPublishedBlogs)
  } , [])

  return (
    <>
      {/* Title */}
      <TopPageTitle title=" وبلاگ" bgColor="bg-amber-400" />
      {/* Main Section */}
      <section className="grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 mt-12 sm:mt-25">
        {/* Sidebar */}
        <aside className="sticky top-36 space-y-5">
          {/* Category */}
        <BlogCategory filteredPublishBlogs={filteredPublishBlogs}/>
        </aside>
        {/* Content */}
        <section className="col-span-1 lg:col-span-2 xl:col-span-3">
        
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
            <Pagination items={filteredPublishBlogs} itemsCount={6} pathname="/blogs" setShowItems={setShowItems}/>
             </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Blogs;
