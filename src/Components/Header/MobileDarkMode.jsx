import { useState } from "react";
import useDarkSide from "../../Hooks/useDarkSide";
import { LightMode} from "@mui/icons-material";
import Moon from '../../assets/Images/svgs/moon.svg'

const DarkMode = ({darkSide, setDarkSide , toggleDarkMode}) => {
  const [colorTheme, setTheme] = useDarkSide();

  return (
    <>
      <div onClick={toggleDarkMode} className="flex items-center gap-x-2 mt-4">
       <div className="w-[38px] h-[38px] flex-center lg:hidden rounded-xl text-slate-500 dark:text-gray-500 bg-gray-100 dark:bg-transparent dark:border dark:border-mainSlate">
       {colorTheme === "light" ? <LightMode className="!size-5"/>: <img src={Moon} alt="ghorbani-dev.ir" className="!size-6" /> }
       </div>
       <p>{colorTheme === 'light' ? 'تم روشن' : 'تم تیره'}</p>
       </div>
    </>
  );
};

export default DarkMode;
