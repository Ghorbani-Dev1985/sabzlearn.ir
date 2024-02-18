import { createContext, useContext, useEffect, useState } from "react";
import ApiRequest from "../Services/Axios/Configs/Config";


const CoursesContext = createContext();

export const CoursesContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [courseIsShowLoading  , setCourseIsShowLoading] = useState(false)
  const abortController = new AbortController()
  useEffect(() => {
    setCourseIsShowLoading(true);
    const ResponseResult = ApiRequest('courses' , {signal: abortController.signal})
    .then((response) => {
      setCourses(response.data)
      setCourseIsShowLoading(false)
    });
    return () => {
      abortController.abort()
    }
  }, []);

  return (
    <CoursesContext.Provider value={{ courses , courseIsShowLoading}}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => useContext(CoursesContext);
