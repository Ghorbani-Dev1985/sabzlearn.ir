import React from "react";
import { usePublicDarkMode } from "../../Contexts/DarkModeContext";
import Logo from "../../assets/Images/Logo/logo.webp";
import LogoTypeLight from "../../assets/Images/svgs/logoTypeLight.svg";
import LogoTypeDark from "../../assets/Images/svgs/logoTypeDark.svg";
import { Link, NavLink } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { useAuth } from "../../Contexts/AuthContext";


function SideBar({menuItems}) {
  const { colorTheme } = usePublicDarkMode();
  const { LogoutHandler } = useAuth();
  return (
    <aside className="fixed top-0 bottom-0 lg:col-span-3 xl:col-span-2 -right-64 z-20 lg:static bg-white dark:bg-gray-800 flex flex-col w-56 lg:mt-10 px-7 py-5 lg:px-0 lg:py-0 shrink-0 lg:min-h-[calc(100vh-68px)] transition-all lg:transition-none">
      {/* Logo */}
      <div className="pb-5 mb-7 border-b md:border-none border-b-gray-200 dark:border-b-mainSlate">
        <Link to="/" className="flex-between">
          <img src={Logo} alt="ghorbani-dev.ir" className="w-28 h-26" />
          {colorTheme === "dark" ? (
            <img
              src={LogoTypeLight}
              alt="ghorbani-dev.ir"
              className="w-28 h-10 lg:h-12"
            />
          ) : (
            <img
              src={LogoTypeDark}
              alt="ghorbani-dev.ir"
              className="w-28 h-10 lg:h-12"
            />
          )}
        </Link>
      </div>
      {/* Navlinks */}
      <div className="space-y-4 text-zinc-700 dark:text-white">
        {menuItems.map(({ id, to, icon, text }) => {
          return (
            <React.Fragment key={id}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-x-2.5 h-10 px-3 bg-primary rounded-lg text-white hover:text-white"
                    : "flex items-center gap-x-2.5 h-10 px-3 bg-transparent rounded-lg text-zinc-500"
                }
              >
                {icon}
                {text}
              </NavLink>
            </React.Fragment>
          );
        })}
        <p
          onClick={LogoutHandler}
          className="flex items-center gap-x-2.5 h-10 px-3 bg-transparent rounded-lg text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-x-3">
            <LogoutOutlined className="size-5" />
            خروج
          </span>
        </p>
      </div>
    </aside>
  );
}

export default SideBar;
