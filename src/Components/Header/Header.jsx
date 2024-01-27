import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Images/Logo/logo.webp";
import DesktopDarkMode from "./DesktopDarkMode";
import { ExpandMore, Search } from "@mui/icons-material";
import SearchBox from "./SearchBox";
import LoginRegister from "./LoginRegister";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-gray-main px-9 md:px-16 lg:px-4 2xl:px-12 h-24 md:h-32 dark:border-b dark:border-b-gray-700 mx-auto max-w-[1920px]">
      {/* Mobile nav icon */}
      <div className="lg:hidden flex items-center justify-center text-slate-500 dark:text-gray-500">
        <MobileNav />
      </div>
      {/* Menu & Logo */}
      <nav className="flex items-center h-14">
        {/* App Logo */}
        <div className="lg:pl-5 lg:ml-5 lg:border-l border-l-gray-100 dark:border-l-gray-700">
          <Link to="/" className="block" title="ghorbani-dev.ir">
            <img
              src={Logo}
              alt="ghorbani-dev.ir"
              className="w-20 md:w-[104px]"
            />
          </Link>
        </div>
        {/* Main Nav */}
        <ul className="hidden lg:flex gap-x-5 text-base xl:text-lg child:relative">
          <li className="group">
            <Link className="flex items-center gap-x-1 h-full text-zinc-700 dark:text-white group-hover:text-primary dark:hover:text-primary transition-colors">
              فرانت اند
              <ExpandMore className="size-5" />
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
              <div className="flex flex-col gap-y-5 w-64 bg-white dark:bg-gray-700 shadow-light dark:shadow-none py-5 px-6 rounded-2xl text-base">
                <Link className="submenu__link">آموزش HTML</Link>
                <Link className="submenu__link">آموزش CSS</Link>
              </div>
            </div>
          </li>
          <li className="group">
            <Link className="flex items-center gap-x-1 h-full text-zinc-700 dark:text-white group-hover:text-primary dark:hover:text-primary transition-colors">
              امنیت
              <ExpandMore className="size-5" />
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
              <div className="flex flex-col gap-y-5 w-64 bg-white dark:bg-gray-700 shadow-light dark:shadow-none py-5 px-6 rounded-2xl text-base">
                <Link className="submenu__link">
                  نقشه راه ورود به دنیای هک و امنیت{" "}
                </Link>
                <Link className="submenu__link">شبکه با گرایش امنیت </Link>
              </div>
            </div>
          </li>
          <li className="group">
            <Link className="flex items-center gap-x-1 h-full text-zinc-700 dark:text-white group-hover:text-primary dark:hover:text-primary transition-colors">
              پایتون
              <ExpandMore className="size-5" />
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
              <div className="flex flex-col gap-y-5 w-64 bg-white dark:bg-gray-700 shadow-light dark:shadow-none py-5 px-6 rounded-2xl text-base">
                <Link className="submenu__link">دوره آموزش پایتون </Link>
                <Link className="submenu__link">
                  پروژه های کاربردی با پایتون{" "}
                </Link>
              </div>
            </div>
          </li>
          <li className="group">
            <Link className="flex items-center gap-x-1 h-full text-zinc-700 dark:text-white group-hover:text-primary dark:hover:text-primary transition-colors">
              پی‌اچ‌پی
              <ExpandMore className="size-5" />
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
              <div className="flex flex-col gap-y-5 w-64 bg-white dark:bg-gray-700 shadow-light dark:shadow-none py-5 px-6 rounded-2xl text-base">
                <Link className="submenu__link">ربات تلگرام با PHP </Link>
                <Link className="submenu__link">پروژه های کاربردی با PHP </Link>
              </div>
            </div>
          </li>
          <li className="group">
            <Link className="flex items-center gap-x-1 h-full text-zinc-700 dark:text-white group-hover:text-primary dark:hover:text-primary transition-colors">
              ارتقای مهارت‌ها
              <ExpandMore className="size-5" />
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
              <div className="flex flex-col gap-y-5 w-64 bg-white dark:bg-gray-700 shadow-light dark:shadow-none py-5 px-6 rounded-2xl text-base">
                <Link className="submenu__link">الگوریتم و ساختمان داده‌ </Link>
                <Link className="submenu__link">آموزش websocket</Link>
              </div>
            </div>
          </li>
          <li className="group">
            <Link className="flex items-center gap-x-1 h-full text-zinc-700 dark:text-white group-hover:text-primary dark:hover:text-primary transition-colors">
              مقالات
              <ExpandMore className="size-5" />
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
              <div className="flex flex-col gap-y-5 w-64 bg-white dark:bg-gray-700 shadow-light dark:shadow-none py-5 px-6 rounded-2xl text-base">
                <Link className="submenu__link"> اچ‌ تی ام ال</Link>
                <Link className="submenu__link"> بوت استرپ</Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      {/* Left Section */}
      <div className="flex-center gap-x-5 h-14">
        <SearchBox />
        <DesktopDarkMode />
        <LoginRegister />
      </div>
    </header>
  );
}

export default Header;
