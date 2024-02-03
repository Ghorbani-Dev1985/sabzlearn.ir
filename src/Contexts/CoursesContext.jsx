import { createContext, useContext, useEffect, useState } from "react";
import { BaseURL } from "../Utils/Utils";
import axios from "axios";

const CoursesContext = createContext();

export const CoursesContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get(`${BaseURL}courses`).then((response) => {
      setCourses(response.data);
    });
  }, []);
  console.log(courses)
  return (
    <CoursesContext.Provider value={{ courses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => useContext(CoursesContext);
