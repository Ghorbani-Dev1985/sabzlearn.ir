import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import {
  CalendarMonthOutlined,
  FolderOpenOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import ShowHtmlTemplate from "../../Components/ShowHtmlTemplate/ShowHtmlTemplate";
import Comment from "../../Components/Comment/Comment";
import toast from "react-hot-toast";
import ShortLink from "../../Components/ShortLink/ShortLink";
import { Link, useParams } from "react-router-dom";
import BlogCategory from "../../Components/BlogCategory/BlogCategory";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { BaseURL, ChangeGregorianDateToPersian } from "../../Utils/Utils";

const newBlogs = [
  {
    id: 1,
    to: "",
    title: "جاواآموزش Class در جاوا اسکریپت",
  },
  {
    id: 2,
    to: "",
    title: "پروژه ساخت پسورد رندوم در پایتون ",
  },
  {
    id: 3,
    to: "",
    title: "  تفاوت تایپ اسکریپت و جاوا اسکریپت",
  },
  {
    id: 4,
    to: "",
    title: " بازی های ساخته شده با پایتون",
  },
  {
    id: 5,
    to: "",
    title: " بک اند چیست؟",
  },
];

function Blog() {
  const {isLoggedIn } = useAuth()
  const {blogName} = useParams()

  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const [blogDetails , setBlogDetails] = useState([])
  const [blogCreator , setBlogCreator] = useState([])
  const [blogCategory , setBlogCategory] = useState([])
  const NewCommentHandler = () => {
    if (isLoggedIn) {
      setShowNewCommentForm((prev) => !prev);
    } else {
      toast.error("لطفا ابتدا در سایت وارد شوید");
    }
  };
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
     axios(`${BaseURL}articles/${blogName}` , {
     headers : {
       'Authorization' : `Bearer ${localStorageData === null ? null : localStorageData.token}`
     }
   })
   .then(blogInfo => {
    setBlogDetails(blogInfo.data)
    setBlogCategory(blogInfo.data.categoryID)
    setBlogCreator(blogInfo.data.creator)
  })

} , []);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        linkOneTo="/blogs"
        linkOneTitle="وبلاگ"
        linkThreeTitle={blogDetails.title}
      />
      {/* Main */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-[3.25rem] mt-7">
        {/* Content */}
        <section className="col-span-1 lg:col-span-2 space-y-5">
          <div className="p-5 dark:border border-gray-700 shadow-light dark:shadow-none bg-white dark:bg-gray-800 rounded-2xl">
            {/* Title */}
            <div className="pb-6 mb-5 border-b border-b-gray-200 dark:border-b-gray-700">
              <h1 className="text-zinc-700 dark:text-white font-MorabbaBold text-2xl/9 lg:text-4xl/[48px]">
                {blogDetails.title}
              </h1>
            </div>
            {/* Author & Date */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="text-xs font-DanaMd text-zinc-700 dark:text-white">
                <PersonOutlineOutlined className="size-6 ml-0.5" />
                <span>نوشته از {blogCreator.name}</span>
              </div>
              <div className="text-xs font-DanaMd text-zinc-700 dark:text-white">
                <FolderOpenOutlined className="size-6 ml-0.5" />
                <span> در دسته بندی {blogCategory.title}</span>
              </div>
              <div className="text-xs font-DanaMd text-zinc-700 dark:text-white">
                <CalendarMonthOutlined className="size-6 ml-0.5" />
                <span>{blogCreator.createdAt && ChangeGregorianDateToPersian(blogCreator.createdAt)}</span>
              </div>
            </div>
            {/* Html Template */}
            <ShowHtmlTemplate
              showMoreDesc={showMoreDesc}
              setShowMoreDesc={setShowMoreDesc}
            >
             {blogDetails.description}
            </ShowHtmlTemplate>
          </div>
          {/* Comment */}
          {/* <Comment
            showNewCommentForm={showNewCommentForm}
            NewCommentHandler={NewCommentHandler}
          /> */}
        </section>
        {/* Sidebar */}
        <aside className="sticky top-36 hidden lg:block col-span-1 w-[300px] xl:w-96 space-y-5">
          {/* Short Link */}
          <ShortLink
            bgColor="bg-yellow-400"
            link="https://sabzlearn.ir/?p=3237"
          />
          {/* New Blogs */}
          <div className="hidden lg:block dark:border border-gray-700 shadow-light dark:shadow-none bg-white dark:bg-gray-800 rounded-2xl py-6 px-6 xl:px-10">
            <span className="flex items-center gap-x-2.5 mb-5 -mr-6 xl:-mr-10 text-zinc-700 dark:text-white font-danaDemiBold text-2xl">
              <span className="block w-7 h-2 bg-pink-500 dark:bg-rose-500 rounded-l-sm -mr-px"></span>
              جدیدترین نوشته ها
            </span>
            <div className="flex flex-col font-danaLight text-xl text-zinc-700 dark:text-white last:child:pb-0 last:child:border-b-0 child:py-3 child:border-b child:border-dashed child:border-b-slate-500 dark:child:border-b-gray-500">
              {newBlogs.map(({ id, to, title }) => {
                return (
                  <React.Fragment key={id}>
                    <Link to={to}>{title}</Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          {/* Category */}
          <BlogCategory />
        </aside>
      </section>
    </>
  );
}

export default Blog;
