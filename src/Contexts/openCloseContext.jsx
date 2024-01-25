import { createContext, useContext, useState } from "react";

const openCloseContext = createContext();

export const OpenCloseProvider = ({ children }) => {
  const [openClose, setOpenClose] = useState(false);

  return (
    <openCloseContext.Provider
      value={{ openClose, setOpenClose }}
    >
      {children}
    </openCloseContext.Provider>
  );
};

export const useOpenClose = () => useContext(openCloseContext);
