import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  List,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CloseOutlined, ExpandMore, Search } from "@mui/icons-material";
import RtlProvider from "../../common/RtlProvider/RtlProvider";
import Logo from "../../assets/Images/Logo/logo.webp";
import LogoTypeLight from "../../assets/Images/svgs/logoTypeLight.svg";
import LogoTypeDark from "../../assets/Images/svgs/logoTypeDark.svg";
import MobileDarkMode from "./MobileDarkMode";
import { usePublicDarkMode } from "../../Contexts/DarkModeContext";
import Button from "../../common/Form/Button";
import { Link } from "react-router-dom";

function MobileNav({ menus }) {
  const { colorTheme } = usePublicDarkMode();
  const [openMobileNav, setMobileNav] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
  const SearchHandler = () => {};
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
                  class="rounded-xl bg-gray-100 dark:focus:text-white text-slate-500 placeholder:text-slate-500 dark:text-gray-500 dark:placeholder-gray-500 w-full h-full dark:border dark:border-gray-700 dark:focus:border-gray-600 dark:bg-gray-800 text-base pl-12 pr-5 block transition-all"
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
            {menus.map(({ _id, href, title, submenus }) => {
              return (
                <React.Fragment key={_id}>
                  <Accordion
                    className="!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden"
                    expanded={expanded === _id}
                    onChange={handleChangeAccordion(_id)}
                  >
                    <AccordionSummary
                      expandIcon={
                        submenus.length > 0 && (
                          <ExpandMore className="!size-5 !text-slate-500 dark:text-slate-400" />
                        )
                      }
                      aria-controls={_id}
                      id={_id}
                    >
                      <Typography
                        className={`${
                          expanded === _id
                            ? "text-zinc-700 dark:text-white"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <Link to={`${href}/1`}>{title}</Link>
                      </Typography>
                    </AccordionSummary>
                    {submenus.length > 0 && (
                      <AccordionDetails>
                        <ul>
                          {submenus.map(({ _id, href, title }) => {
                            return (
                              <React.Fragment key={_id}>
                                <li>
                                  <Link to={href}>{title}</Link>
                                </li>
                              </React.Fragment>
                            );
                          })}
                        </ul>
                      </AccordionDetails>
                    )}
                  </Accordion>
                </React.Fragment>
              );
            })}
            <Divider className="dark:border-mainSlate" />
            <MobileDarkMode />
          </Box>
        </Drawer>
      </RtlProvider>
    </>
  );
}

export default MobileNav;
