import { createContext, useContext, useState } from "react";
import useDarkSide from "../Hooks/useDarkSide";

const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <DarkModeContext.Provider
      value={{ darkSide, setDarkSide , toggleDarkMode , colorTheme , setTheme}}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const usePublicDarkMode = () => useContext(DarkModeContext);
