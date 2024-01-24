import { createContext, useContext, useState } from "react";

const ShowRealtimeDatasContext = createContext();

export const ShowRealtimeDatasProvider = ({ children }) => {
  const [showRealtimeDatas , setShowRealTimeDatas] = useState(false)

  return (
    <ShowRealtimeDatasContext.Provider
      value={{ showRealtimeDatas, setShowRealTimeDatas }}
    >
      {children}
    </ShowRealtimeDatasContext.Provider>
  );
};

export const useShowRealtimeDatas = () => useContext(ShowRealtimeDatasContext);
