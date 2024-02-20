import React from "react";
import { LightMode } from "@mui/icons-material";
import Moon from "../../assets/Images/svgs/moon.svg";
import { usePublicDarkMode } from "../../Contexts/DarkModeContext";

const DarkMode = () => {
  const { darkSide, setDarkSide, toggleDarkMode, colorTheme, setTheme } =
    usePublicDarkMode();
  return (
    <>
      <div
        onClick={toggleDarkMode}
        className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-transparent text-slate-500 dark:text-gray-500 dark:border dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:border-gray-600 transition-colors"
      >
        {colorTheme === "light" ? (
          <LightMode className="size-7" />
        ) : (
          <img src={Moon} alt="ghorbani-dev.ir" className="size-8" />
        )}
      </div>
    </>
  );
};

export default DarkMode;
