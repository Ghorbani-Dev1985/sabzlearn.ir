import { ArrowLeft } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';


const categoryItems = [
    {
      id: 1,
      to: "",
      title: "جاوا اسکریپت",
    },
    {
      id: 2,
      to: "",
      title: "طراحی سایت",
    },
    {
      id: 3,
      to: "",
      title: " کسب درآمد از برنامه نویسی",
    },
    {
      id: 4,
      to: "",
      title: " پایتون",
    },
    {
      id: 5,
      to: "",
      title: " شروع برنامه نویسی",
    },
    {
      id: 6,
      to: "",
      title: " اچ تی ام ال",
    },
    {
      id: 7,
      to: "",
      title: " سی اس اس",
    },
    {
      id: 8,
      to: "",
      title: " ریکت جی اس",
    },
  ];

function BlogCategory({filteredPublishBlogs}) {
  console.log(filteredPublishBlogs)

  return (
    <div className="hidden lg:block dark:border border-gray-700 shadow-light dark:shadow-none bg-white dark:bg-gray-800 rounded-2xl p-6">
    <span className="flex items-center gap-x-2.5 mb-5 -mr-6 text-zinc-700 dark:text-white font-DanaMd text-2xl">
      <span className="block w-7 h-2 bg-primary rounded-l-sm -mr-px"></span>
     موضوعات دیگر
    </span>
    <ul className="flex flex-col gap-y-4 text-sm text-zinc-700 dark:text-white">
      {filteredPublishBlogs.slice(0 , 6).map(({ _id, shortName, title }) => {
        return (
          <React.Fragment key={_id}>
            <li className='flex items-center'>
              <ArrowLeft className="size-8 text-primary" />
              <Link
                to={`/blog/${shortName}`}
                className="text-zinc-700 line-clamp-1 dark:text-white text-sm"
              >
                {title}
              </Link>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  </div>
  )
}

export default BlogCategory
