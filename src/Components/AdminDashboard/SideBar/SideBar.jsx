import React from 'react'
import { usePublicDarkMode } from '../../../Contexts/DarkModeContext';
import Logo from "../../../assets/Images/Logo/logo.webp";
import LogoTypeLight from "../../../assets/Images/svgs/logoTypeLight.svg";
import LogoTypeDark from "../../../assets/Images/svgs/logoTypeDark.svg";
import { NavLink } from 'react-router-dom';
import { Article, Folder, Group, Home , List} from '@mui/icons-material';



const AdminDashboardNavItems = [
  {
    id: 1,
    to: 'Overview',
    icon: <Home />,
    text: 'نمای کلی'
  },
  {
    id: 2,
    to: 'users',
    icon: <Group />,
    text: ' کاربرها'
  },
  {
    id: 3,
    to: 'courses',
    icon: <Folder />,
    text: ' دوره‌ها'
  },
  {
    id: 4,
    to: 'menus',
    icon: <List />,
    text: ' منوها'
  },
  {
    id: 5,
    to: 'blogs',
    icon: <Article />,
    text: ' مقاله‌ها'
  },
]

function SideBar() {
  const {  colorTheme } = usePublicDarkMode();
  return (
    <aside className='fixed top-0 bottom-0 -right-64 z-30 lg:static bg-white dark:bg-gray-800 flex flex-col w-64 lg:w-56 lg:mt-10 px-7 py-5 lg:px-0 lg:py-0 shrink-0 lg:min-h-[calc(100vh-68px)] transition-all lg:transition-none'>
      {/* Logo */}
      <div className='flex-between gap-3 pb-5 mb-7 border-b md:border-none border-b-gray-200 dark:border-b-mainSlate'>
      <img src={Logo} alt="ghorbani-dev.ir" className="w-28 h-26" />
                {
                  colorTheme === 'dark' ? <img
                  src={LogoTypeLight}
                  alt="ghorbani-dev.ir"
                  className="w-28 h-10 md:h-14"
                /> : <img
                src={LogoTypeDark}
                alt="ghorbani-dev.ir"
                className="w-28 h-10 md:h-14"
              />
                }
      </div>
       {/* Navlinks */}
       <div className='space-y-4 text-zinc-700 dark:text-white'>
        {
          AdminDashboardNavItems.map(({id , to , icon , text}) => {
            return (
              <React.Fragment key={id}>
              <NavLink to={to} className={({ isActive }) =>
               isActive
               ? "flex items-center gap-x-2.5 h-10 px-3 bg-primary rounded-lg text-white hover:text-white"
               : "flex items-center gap-x-2.5 h-10 px-3 bg-transparent rounded-lg text-white"
            }>{icon}{text}</NavLink>
            </React.Fragment>
            )
          })
        }
       </div>
    </aside>
  )
}

export default SideBar
