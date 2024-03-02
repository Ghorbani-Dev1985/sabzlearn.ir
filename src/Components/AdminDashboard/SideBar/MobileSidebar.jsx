import { Box, Divider, Drawer } from "@mui/material";
import React, { useState } from "react";
import Logo from "../../../assets/Images/Logo/logo.webp";
import LogoTypeLight from "../../../assets/Images/svgs/logoTypeLight.svg";
import LogoTypeDark from "../../../assets/Images/svgs/logoTypeDark.svg";
import MobileDarkMode from "../../Header/MobileDarkMode";
import { usePublicDarkMode } from "../../../Contexts/DarkModeContext";
import Button from "../../../common/Form/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  CloseOutlined,
  Search,
} from "@mui/icons-material";
import RtlProvider from "../../../common/RtlProvider/RtlProvider";
import { useAuth } from "../../../Contexts/AuthContext";
import { AdminDashboardNavItems } from "../../../Utils/Utils";



function MobileNav() {
  const { colorTheme } = usePublicDarkMode();
  const { LogoutHandler } = useAuth();
  const [openMobileNav, setMobileNav] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const Navigate = useNavigate();
  const SearchHandler = () => {
    Navigate(`/search/${searchValue}`);
  };
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMobileNav((prev) => !prev);
  };
  return (
    <>
      <Button btnType="button" disabled={false} onClick={toggleDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>{" "}
      </Button>
      <RtlProvider>
        <Drawer
          anchor="left"
          className="block lg:hidden"
          open={openMobileNav}
          onClose={toggleDrawer}
        >
          <Box className="w-72 pb-16 px-7 text-slate-400">
            <Box className="flex-between pb-5 mt-5 relative">
              <div className="flex-center gap-x-2">
                <img src={Logo} alt="ghorbani-dev.ir" className="w-14" />
                {colorTheme === "dark" ? (
                  <img
                    src={LogoTypeLight}
                    alt="ghorbani-dev.ir"
                    className="w-20 h-9"
                  />
                ) : (
                  <img
                    src={LogoTypeDark}
                    alt="ghorbani-dev.ir"
                    className="w-20 h-9"
                  />
                )}
              </div>
              <div onClick={toggleDrawer}>
                <CloseOutlined />
              </div>
            </Box>
            <Divider className="dark:border-mainSlate" />
            <form class="block mt-7">
              <label class="relative w-full h-12 block transition-all">
                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  class="rounded-xl bg-gray-100 dark:focus:text-white outline-none text-slate-500 placeholder:text-slate-500 dark:text-gray-500 dark:placeholder-gray-500 w-full h-full dark:border dark:border-gray-700 dark:focus:border-gray-600 dark:bg-gray-800 text-base pl-12 pr-5 block transition-all"
                  name="s"
                  type="text"
                  placeholder="جستجو"
                />
                <Button
                  btnType="submit"
                  className="absolute left-4 top-0 bottom-0 w-6 h-6 my-auto text-slate-500 dark:text-gray-500"
                  disabled={false}
                  onClick={SearchHandler}
                >
                  <Search className="size-6" />
                </Button>
              </label>
            </form>
            {/* Menus Items */}
            <div className="space-y-4 text-zinc-700 dark:text-white mt-5">
              {AdminDashboardNavItems.map(({ id, to, icon, text }) => {
                return (
                  <React.Fragment key={id}>
                    <NavLink
                      onClick={toggleDrawer}
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
            <Divider className="dark:border-mainSlate !mt-3" />
            <MobileDarkMode />
          </Box>
        </Drawer>
      </RtlProvider>
    </>
  );
}

export default MobileNav;
