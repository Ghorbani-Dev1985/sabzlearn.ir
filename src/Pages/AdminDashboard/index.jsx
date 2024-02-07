import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../Components/AdminDashboard/SideBar/SideBar'
import { Notifications } from '@mui/icons-material'
import DesktopDarkMode from '../../Components/Header/DesktopDarkMode'
import { Backdrop } from '@mui/material'


function index() {
    const [showNotification , setShowNotification] = useState(false)
  return (
    <main className='md:bg-white md:dark:bg-gray-800 flex gap-x-10 2xl:gap-x-14 lg:px-8 xl:px-14 2xl:px-25 lg:py-7'>
     <SideBar />
     <section className='w-full max-w-[1432px] mx-auto bg-gray-100 dark:bg-gray-main md:p-10 lg:rounded-4xl'>
    <header className='flex-between bg-white dark:bg-gray md:bg-transparent dark:border-b md:border-none border-b-gray-700 mb-6 md:mb-14 p-5 md:p-0'>
    <h3 className="hidden md:block font-DanaBold text-2xl text-zinc-700 dark:text-white">
				moh1985  عزیز؛ خوش اومدی 🙌
			</h3>
            <div className='flex gap-x-3.5 md:gap-x-7'>
                {/* Notification */}
                <div className="relative group" id="notifications">
					<div onClick={() => setShowNotification((prev) => !prev)} className="notifications flex-center w-12 h-12 md:w-14 md:h-14 bg-gray-100 md:bg-white dark:bg-gray-800 text-slate-500 dark:text-gray-600 rounded-full cursor-pointer">
						     <Notifications className='size-6 md:size-7'/>
                        </div>
					  {/* Show Notification */}
                      <Backdrop
        sx={{ color: '#fff', zIndex: '30' }}
        open={showNotification}
        onClick={() => setShowNotification((prev) => !prev)}
      ></Backdrop>
             {
                showNotification &&  <div className="absolute left-0 top-full pt-4 z-50 transition-all -translate-x-28 md:translate-x-0 hide" id="notifications-dropdown">
						<div className="w-80 md:w-96 bg-white dark:bg-gray-800 py-5 px-4.5 rounded-2xl">
							<div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-b-gray-200 dark:border-b-slate-500">
								<span className="font-danaMedium text-xl text-zinc-700 dark:text-white">اعلان ها</span>
															</div>
							<div className="notifications-list max-h-96 overflow-y-auto space-y-3 -ml-2 pl-2 text-zinc-700 dark:text-white">
								<div className="text-center bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">اعلان جدیدی وجود ندارد.</div>
															</div>
						</div>
					</div>
             }
					
				</div>
                {/* Dark Theme */}
                <DesktopDarkMode />
            </div>
    </header>
      <div className='px-5 md:px-0'>
      <Outlet />
      </div>
     </section>
    </main>
  )
}

export default index
