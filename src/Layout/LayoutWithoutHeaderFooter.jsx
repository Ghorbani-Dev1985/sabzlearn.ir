import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from "../assets/Images/Logo/logo.webp";
import LogoTypeLight from "../assets/Images/svgs/logoTypeLight.svg";
import LogoTypeDark from "../assets/Images/svgs/logoTypeDark.svg";
import { usePublicDarkMode } from '../Contexts/DarkModeContext';

function Layout() {
  const {  colorTheme } = usePublicDarkMode();
  return (
    <>
     <div className='flex-center min-h-screen'>
      <div className='w-full xs:w-[25rem] px-5 xs:p-0'>
        {/* Logo */}
       <div className='flex-center gap-x-2.5 mb-7 sm:mb-10'>
       <img src={Logo} alt="ghorbani-dev.ir" className="w-[143px] h-26" />
                {
                  colorTheme === 'dark' ? <img
                  src={LogoTypeLight}
                  alt="ghorbani-dev.ir"
                  className="w-[143px] h-[67px]"
                /> : <img
                src={LogoTypeDark}
                alt="ghorbani-dev.ir"
                className="w-[143px] h-[67px]"
              />
                }
       </div>
       {/* Body */}
       <div className='relative p-7 sm:px-8 sm:py-9 bg-white dark:bg-gray-800 shadow-light dark:shadow-none rounded-2xl'>   
       <Outlet />
       </div>
      </div>
    </div>
    </>
  )
}

export default Layout
