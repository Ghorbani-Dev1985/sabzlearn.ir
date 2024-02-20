import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import UserImg from "../../assets/Images/CommentFormUser/none.png";
import {
  FolderOpenOutlined,
  HomeOutlined,
  PermIdentityOutlined,
  SmsOutlined,
} from "@mui/icons-material";
import UserProfile from "../../Components/UserProfile/UserProfile";
const dashboardLinks = [
  {
    id: 1,
    to: "mySabzlearn/orders",
    icon: <HomeOutlined className="size-5" />,
    linkText: " سبزلرن من",
  },
  {
    id: 2,
    to: "mySabzlearn/courses",
    icon: <FolderOpenOutlined className="size-5" />,
    linkText: " دوره های من",
  },
  {
    id: 3,
    to: "mySabzlearn/tickets",
    icon: <SmsOutlined className="size-5" />,
    linkText: " تیکت های پشتیانی",
  },
  {
    id: 4,
    to: "mySabzlearn/editProfile",
    icon: <PermIdentityOutlined className="size-5" />,
    linkText: " جزییات حساب ",
  },
];

function LoginRegister() {
  const { isLoggedIn, userInfos } = useAuth();
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);
  return (
    <div className="relative text-base xl:text-lg text-white md:h-14 md:w-[155px] xl:w-[180px]">
      {isLoggedIn ? (
        <div className="relative z-20 shrink-0">
          <div onClick={() => setShowUserProfileMenu((prev) => !prev)}>
            <img
              src={UserImg}
              alt="ghorbani-dev.ir"
              className="object-cover size-12 md:size-14 rounded-full inline-block cursor-pointer"
            />
          </div>
          {showUserProfileMenu && (
            <UserProfile
              showUserProfileMenu={showUserProfileMenu}
              setShowUserProfileMenu={setShowUserProfileMenu}
              wallet={true}
            >
              {dashboardLinks.map(({ id, to, icon, linkText }) => {
                return (
                  <React.Fragment key={id}>
                    <Link
                      to={to}
                      className="flex-between text-zinc-700 dark:text-white px-2.5 h-[46px] rounded-xl hover:bg-gray-100 dark:hover:bg-mainSlate transition-colors"
                    >
                      <span className="flex items-center gap-x-3">
                        {icon}
                        {linkText}
                      </span>
                    </Link>
                  </React.Fragment>
                );
              })}
            </UserProfile>
          )}
        </div>
      ) : (
        <>
          <Link
            to="/login"
            className="absolute right-0 w-25 xl:w-28 hidden md:flex items-center hover:text-white justify-start h-full bg-sky-500/50 hover:bg-sky-400 dark:bg-secondaryLight dark:hover:bg-secondary/60 rounded-full pr-5 transition-colors"
          >
            ورود
          </Link>
          <Link
            to="/register"
            className="absolute left-0 w-25 xl:w-28 hidden md:flex items-center hover:text-white justify-center h-full bg-sky-500 hover:bg-sky-600 dark:bg-secondary dark:hover:bg-[#3F6CD8] rounded-full z-10 transition-colors"
          >
            عضویت
          </Link>
          {/* Show in SM */}
          <Link
            to="/login"
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-slate-500 dark:bg-gray-800 dark:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
        </>
      )}
    </div>
  );
}

export default LoginRegister;
