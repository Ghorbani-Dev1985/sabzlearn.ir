import { useState } from "react";
import useDarkSide from "../../Hooks/useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { LightMode , DarkModeIcon} from "@mui/icons-material";

const DarkMode = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <>
        {/* <DarkModeSwitch
          moonColor="#fdba74"
          sunColor=""
          className="text-orange-300 w-5 h-5 md:w-7 md:h-7 hidden md:block"
          checked={darkSide}
          onChange={toggleDarkMode}
        />
      <div className="flex md:hidden items-center gap-x-2">
        <input type="checkbox" className="hidden" checked={darkSide}
          onChange={toggleDarkMode} id="toggleDarkMode" hidden />
          <label htmlFor="toggleDarkMode">
            
          {colorTheme === "light" ? <div className="inline-flex items-center gap-x-2.5"><LightMode className="size-5"/><span>تم روشن</span></div> : <div className="inline-flex items-center gap-x-2.5"><DarkMode className="size-5"/><span>تم تیره</span></div>}
          </label>
      </div> */}
    </>
  );
};

export default DarkMode;
