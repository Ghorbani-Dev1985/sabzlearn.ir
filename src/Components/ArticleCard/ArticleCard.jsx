import { ArrowCircleLeft,  CalendarToday} from "@mui/icons-material";

import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({
  to,
  src,
  title,
  description,
  authorLink,
  authorName,
  date,
}) {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:border border-gray-700 rounded-2xl">
      {/* Article Img */}
      <div className="relative h-[217px] overflow-hidden before:content-[''] before:absolute before:-bottom-3 before:left-0 before:bg-beforeArticle before:w-full before:h-[180px] after:content-[''] after:absolute after:-bottom-3 after:left-0 after:bg-afterArticle after:w-full after:h-[180px]">
        <img
          src={src}
          className="block w-full h-full object-cover"
          alt="ghorbani-dev.ir"
        />
      </div>
      {/* Body */}
      <div className="flex flex-col gap-y-8 flex-grow px-5">
        <div className="relative pt-1.5">
          {/* Title & Description */}
          <h4 className="font-DanaMd h-12 max-h-12 line-clamp-2 text-base text-zinc-700 dark:text-white mb-2.5">
            <Link className={to}>{title}</Link>
          </h4>
          <p className="font-Dana text-sm h-24 line-clamp-4 text-slate-500 dark:text-slate-400">
            {description}
          </p>
          {/* Footer */}
          <div className="mt-3 space-y-4">
            {/* Author & Date */}
            <div className="flex gap-2.5 flex-wrap text-slate-500 dark:text-slate-400 text-xs">
              <div className="flex items-center gap-x-1 hover:text-primary transition-colors cursor-pointer">
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
                <Link to={authorLink}>{authorName}</Link>
              </div>
            <div className="flex items-center gap-x-1">
              <CalendarToday className="size-4"/>
              <span>{date}</span>
            </div>
            </div>
          </div>
          {/* More Link */}
          <div className="flex-center py-3.5 border-t border-t-gray-100 dark:border-gray-700">
            <Link
              to={to}
              className="text-zinc-700 dark:text-white hover:text-primary dark:hover:text-primary space-x-2.5 font-DanaMd transition-colors"
            >
              مطالعه مقاله
              <ArrowCircleLeft />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
