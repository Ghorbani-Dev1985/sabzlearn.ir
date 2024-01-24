import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Images/Logo/logo.webp'

function Header() {
  return (
    <header className='flex items-center justify-between bg-white dark:bg-gray px-9 md:px-16 lg:px-4 2xl:px-12 h-22 md:h-32 dark:border-b dark:border-b-gray-700 mx-auto max-w-[1920px]'>
      {/* Mobile nav icon */}
      <div className='lg:hidden flex items-center justify-center'></div>
      {/* Menu & Logo */}
      <nav className='flex items-center h-14'>
          {/* App Logo */}
          <div className='lg:pl-5 lg:ml-5 lg:border-l border-l-gray-100 dark:border-l-gray-700'>
                <Link to="/" className='block' title='ghorbani-dev.ir'>
                  <img src={Logo} alt='ghorbani-dev.ir' className='w-20 md:w-[104px]' />
                </Link>
          </div>
      </nav>
    </header>
  )
}

export default Header
