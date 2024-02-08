import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle, FolderOpenOutlined, HomeOutlined, Notifications, PermIdentityOutlined, SmsOutlined } from "@mui/icons-material";
import DesktopDarkMode from "../../Header/DesktopDarkMode";
import { Backdrop } from "@mui/material";
import usePut from "../../../Hooks/usePut";
import axios from "axios";
import { BaseURL } from "../../../Utils/Utils";
import toast from "react-hot-toast";
import UserProfile from "../../../Components/UserProfile/UserProfile";
import { Link } from "react-router-dom";
import UserImg from '../../../assets/Images/CommentFormUser/none.png'


const dashboardLinks = [
  {
  id: 1,
  to: '',
  icon: <HomeOutlined className='size-5'/>,
  linkText: 'حساب کاربری'
},

]



function TopBar() {
  const [adminInfos, setAdminInfos] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [showUserProfileMenu , setShowUserProfileMenu] = useState(false)
  const GetNonfiction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    return(
      axios(`${BaseURL}auth/me`, {
        headers: {
          'Authorization' : `Bearer ${localStorageData.token}`,
        },
      })
        .then((response) => {
          setAdminInfos(response.data);
          setAllNotifications(response.data.notifications);
        })
        .catch((error) => {
          console.log(error);
          toast.error("  خطا در اتصال به سرور ");
        })
    )
    }
    const SeeNotificationHandler = (_id) => {
        const putReq = usePut(`notifications/see/${_id}`);
        GetNonfiction()
        setShowNotification(false)
    };
    useEffect(() => {
      GetNonfiction()
  }, []);

  console.log(allNotifications);
  return (
    <header className="flex-between bg-white dark:bg-gray md:bg-transparent dark:border-b md:border-none border-b-gray-700 mb-6 md:mb-14 p-5 md:p-0">
      <h3 className="hidden md:block font-DanaBold text-2xl text-zinc-700 dark:text-white">
        <span className="text-primary font-DanaBold">{adminInfos.name} </span>
        عزیز؛ خوش اومدی 🙌
      </h3>
      <div className="flex gap-x-3.5 md:gap-x-7">
        {/* Notification */}
        <div className="relative group" id="notifications">
          <div
            onClick={() => setShowNotification((prev) => !prev)}
            className="notifications flex-center w-12 h-12 md:w-14 md:h-14 bg-gray-100 md:bg-white dark:bg-gray-800 text-slate-500 dark:text-gray-600 rounded-full cursor-pointer"
          >
            <Notifications className="size-6 md:size-7" />
          </div>
          {/* Show Notification */}
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: "30",
              backdropFilter: "blur(6px)",
              backgroundColor: "rgb(130 130 130 / 8%)",
            }}
            open={showNotification}
            onClick={() => setShowNotification((prev) => !prev)}
          ></Backdrop>
          {showNotification && (
            <div
              className="absolute left-0 top-full pt-4 z-50 transition-all -translate-x-28 md:translate-x-0 hide"
              id="notifications-dropdown"
            >
              <div className="w-80 md:w-[400px] bg-white dark:bg-gray-800 py-5 px-4.5 rounded-2xl">
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-b-gray-200 dark:border-b-slate-500">
                  <span className="font-danaMedium text-xl text-zinc-700 dark:text-white">
                    اعلان ها
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-3 -ml-2 pl-2 text-zinc-700 dark:text-white">
                  {allNotifications.length > 0 ? (
                    allNotifications.map(({ _id , msg}) => {
                      return (
                        <React.Fragment key={_id}>
                          <div className="flex-between bg-gray-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-mainSlate transition-colors p-3 rounded-xl">
                            <p className="text-wrap">{msg}</p>
                            <div onClick={() => SeeNotificationHandler(_id)} className="text-primary cursor-pointer">
                              <CheckCircle className="size-6"/>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div className="text-center bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                      اعلان جدیدی وجود ندارد.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Dark Theme */}
        <DesktopDarkMode />
        <div className='relative z-20 shrink-0'>
            <div onClick={() => setShowUserProfileMenu((prev) => !prev)}>
              <img src={UserImg} alt='ghorbani-dev.ir' className='object-cover size-12 md:size-14 rounded-full inline-block cursor-pointer'/>
            </div>
          {
            showUserProfileMenu && <UserProfile showUserProfileMenu={showUserProfileMenu} setShowUserProfileMenu={setShowUserProfileMenu} left={'left-0'} >
            {
            dashboardLinks.map(({id, to , icon , linkText}) => {
              return(
                <React.Fragment key={id}>
                <Link to={to} className='flex-between text-zinc-700 dark:text-white px-2.5 h-[46px] rounded-xl hover:bg-gray-100 dark:hover:bg-mainSlate transition-colors'>
                   <span className='flex items-center gap-x-3'>
                    {icon}
                    {linkText}
                    </span>
                </Link>
                </React.Fragment>
              )
            })
          }
        </UserProfile>
          }
            </div>
       
      </div>
    </header>
  );
}

export default TopBar;
