import { createContext, useContext, useState } from "react";

const ShowLoadingContext = createContext();

export const ShowLoadingProvider = ({ children }) => {
  const [isShowLoading, setIsShowLoading] = useState(false);

  return (
    <ShowLoadingContext.Provider
      value={{ isShowLoading, setIsShowLoading }}
    >
      {children}
    </ShowLoadingContext.Provider>
  );
};

export const useShowLoading = () => useContext(ShowLoadingContext);
