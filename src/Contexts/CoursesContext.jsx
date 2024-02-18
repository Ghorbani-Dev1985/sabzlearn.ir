import { createContext, useContext, useEffect, useState } from "react";
import ApiRequest from "../Services/Axios/Configs/Config";

const CoursesContext = createContext();

export const CoursesContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const abortController = new AbortController()
  useEffect(() => {
    const ResponseResult = ApiRequest('courses' , {signal: abortController.signal})
    .then((response) => {
      setCourses(response.data)
    });
    return () => {
      abortController.abort()
    }
  }, []);

  return (
    <CoursesContext.Provider value={{ courses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => useContext(CoursesContext);
