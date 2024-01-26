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
import React, { useEffect, useState } from "react";
import { CloseOutlined, ExpandMore, Search } from "@mui/icons-material";
import RtlProvider from "../../common/RtlProvider/RtlProvider";
import Logo from "../../assets/Images/Logo/logo.webp";
import LogoTypeLight from "../../assets/Images/svgs/logoTypeLight.svg";
import LogoTypeDark from "../../assets/Images/svgs/logoTypeDark.svg";
import MobileDarkMode from "./MobileDarkMode";
import { usePublicDarkMode } from "../../Contexts/DarkModeContext";

function MobileNav() {
  const {  colorTheme } = usePublicDarkMode();
  console.log(colorTheme)
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
  console.log(localStorage.getItem("theme"));
  return (
    <>
      <button onClick={toggleDrawer}>
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
        </svg>
      </button>
      <RtlProvider>
        <Drawer anchor="left" className="block lg:hidden" open={openMobileNav} onClose={toggleDrawer}>
          <Box className="w-64 pb-16 px-7 text-slate-400">
            <Box className="flex-between pb-5 mt-5 relative">
              <div className="flex-center gap-x-2">
                <img src={Logo} alt="ghorbani-dev.ir" className="w-14" />
                {
                  colorTheme === 'dark' ? <img
                  src={LogoTypeLight}
                  alt="ghorbani-dev.ir"
                  className="w-20 h-9"
                /> : <img
                src={LogoTypeDark}
                alt="ghorbani-dev.ir"
                className="w-20 h-9"
              />
                }
                
              </div>
              <div onClick={toggleDrawer}>
                <CloseOutlined />
              </div>
            </Box>
            <Divider className="dark:border-mainSlate" />
            <form className="block mt-7">
              <label className="relative w-full h-12 block transition-all">
                <input
                  type="text"
                  className="rounded-xl bg-gray-100 dark:focus:text-white text-slate-500 placeholder:text-slate-500 dark:text-gray-500 dark:placeholder-gray-500 w-full h-full dark:border dark:border-gray-700 dark:focus:border-gray-600 dark:bg-gray-800 text-base pl-12 pr-5 block transition-all"
                  placeholder="جستجو"
                />
                <button
                  type="submit"
                  className="absolute left-4 top-0 bottom-0 w-6 h-6 my-auto text-slate-500/50 dark:text-gray-500"
                >
                  <Search />
                </button>
              </label>
            </form>
            <Accordion
              className="!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden"
              expanded={expanded === "panel1"}
              onChange={handleChangeAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore className="!size-5 !text-slate-500 dark:text-slate-400" />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  className={`${
                    expanded === "panel1"
                      ? "text-zinc-700 dark:text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  فرانت اند
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden"
              expanded={expanded === "panel2"}
              onChange={handleChangeAccordion("panel2")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore className="!text-slate-500 !size-5 dark:text-slate-400" />
                }
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  className={`${
                    expanded === "panel2"
                      ? "text-zinc-700 dark:text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  امنیت
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden"
              expanded={expanded === "panel3"}
              onChange={handleChangeAccordion("panel3")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore className="!text-slate-500 !size-5 dark:text-slate-400" />
                }
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  className={`${
                    expanded === "panel3"
                      ? "text-zinc-700 dark:text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  پایتون
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden"
              expanded={expanded === "panel4"}
              onChange={handleChangeAccordion("panel4")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore className="!text-slate-500 !size-5 dark:text-slate-400" />
                }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography
                  className={`${
                    expanded === "panel4"
                      ? "text-zinc-700 dark:text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  پی‌ اچ پی
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden"
              expanded={expanded === "panel5"}
              onChange={handleChangeAccordion("panel5")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore className="!text-slate-500 !size-5 dark:text-slate-400" />
                }
                aria-controls="panel4bh-content"
                id="panel5bh-header"
              >
                <Typography
                  className={`${
                    expanded === "panel5"
                      ? "text-zinc-700 dark:text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {" "}
                  ارتقای مهارت ها
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden"
              expanded={expanded === "panel6"}
              onChange={handleChangeAccordion("panel6")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore className="!text-slate-500 !size-5 dark:text-slate-400" />
                }
                aria-controls="panel4bh-content"
                id="panel6bh-header"
              >
                <Typography
                  className={`${
                    expanded === "panel6"
                      ? "text-zinc-700 dark:text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {" "}
                  مقالات
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Divider className="dark:border-mainSlate" />
            <MobileDarkMode />
          </Box>
        </Drawer>
      </RtlProvider>
    </>
  );
}

export default MobileNav;
