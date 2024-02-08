import { Backdrop } from "@mui/material"
import { useAuth } from "../../Contexts/AuthContext"
import UserImg from '../../assets/Images/CommentFormUser/none.png'
import { Link } from "react-router-dom"
import { LogoutOutlined } from "@mui/icons-material"


const UserProfile = ({children, showUserProfileMenu , setShowUserProfileMenu , left , wallet}) =>{
    const {LogoutHandler , userInfos} = useAuth()
    return (
     <>
     
      <Backdrop
      sx={{ color: '#fff' , zIndex : '30'}}
      open={showUserProfileMenu}
      onClick={() => setShowUserProfileMenu((prev) => !prev)}
      >
    </Backdrop>
    <div className={`${left ? `${left}` : 'left-25'} absolute z-50 top-full pt-4 transition-all`}>
       <div className='w-[278px] bg-white dark:bg-gray-700 py-5 px-6 rounded-2xl'>
          {/* Header */}
            <div className='flex items-center border-b border-b-gray-200 dark:border-b-mainSlate pb-5 mb-2'>
                <Link to="" className='shrink-0'>
                <img src={UserImg} alt='ghorbani-dev.ir' className='object-cover size-14 rounded-full inline-block'/>
                </Link>
                <div className='mr-2.5 flex flex-col gap-y-1 overflow-hidden'>
                <span className="text-lg text-zinc-700 dark:text-white inline-block truncate"> {userInfos && userInfos.name}</span>
                {
                  wallet &&  <span className="text-sm text-sky-500 dark:text-secondary inline-block font-danaMedium">موجودی: 0 تومان</span>
                }
               
                </div>
            </div>
            {/* Links */}
            {children}
             {/* Logout */}
             <div onClick={() => {
              LogoutHandler()
              setShowUserProfileMenu(false)
             }} className='mt-2 pt-2 border-t border-t-gray-200 dark:border-t-mainSlate'>
                  <Link to="" className='flex-between text-zinc-700 dark:text-white px-2.5 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-mainSlate transition-colors'>
                  <span className='flex items-center gap-x-3'>
                       <LogoutOutlined className='size-5'/>
                       خروج
                  </span>
                  </Link>
             </div>
       </div>
     </div>
      </>
    )
  }
  
  export default UserProfile