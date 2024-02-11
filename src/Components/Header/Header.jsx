import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Images/Logo/logo.webp";
import DesktopDarkMode from "./DesktopDarkMode";
import { ExpandMore, Search } from "@mui/icons-material";
import SearchBox from "./SearchBox";
import LoginRegister from "./LoginRegister";
import MobileNav from "./MobileNav";
import useFetch from "../../Hooks/useFetch";

function Header() {
  const { datas: menus } = useFetch("menus", "");
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-gray-main px-9 md:px-16 lg:px-4 2xl:px-12 h-24 md:h-32 dark:border-b dark:border-b-gray-700 mx-auto max-w-[1920px]">
      {/* Mobile nav icon */}
      <div className="lg:hidden flex items-center justify-center text-slate-500 dark:text-gray-500">
        <MobileNav menus={menus}/>
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

          {
            menus.map(({_id , href , title , submenus})=> {
              return(
                <li key={_id} className="group">
            <Link to={`${href}/1`} className="flex items-center gap-x-1 h-full text-zinc-700 dark:text-white group-hover:text-primary dark:hover:text-primary transition-colors">
                {title}
                {submenus.length > 0 && <ExpandMore className="size-5" />}  
                </Link>
                {
                submenus.length > 0 && (
                  <>
                <div key={_id} className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
                  <div className="flex flex-col gap-y-5 w-64 bg-white dark:bg-gray-700 shadow-light dark:shadow-none py-5 px-6 rounded-2xl text-base">
                   {
                     submenus.map(({_id, href , title}) => {
                      return (
                    <Link to={href} className="submenu__link">{title}</Link>
                    )
                  })
                }
                </div>
              </div>
                  </>
                )
                }
          </li>
              )
            })
          }
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
