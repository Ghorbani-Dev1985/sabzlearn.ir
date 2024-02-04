import { createContext, useContext, useEffect, useState } from "react";
import { BaseURL } from "../Utils/Utils";
import axios from "axios";

const BlogsContext = createContext();

export const BlogsContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`${BaseURL}articles`).then((response) => {
      setBlogs(response.data);
    });
  }, []);
  return (
    <BlogsContext.Provider value={{ blogs }}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogsContext);
