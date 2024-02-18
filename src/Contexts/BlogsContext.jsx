import { createContext, useContext, useEffect, useState } from "react";
import ApiRequest from "../Services/Axios/Configs/Config";

const BlogsContext = createContext();

export const BlogsContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const abortController = new AbortController()
  useEffect(() => {
    const ResponseResult = ApiRequest('articles' , {signal: abortController.signal})
    .then((response) => {
      setBlogs(response.data)
    });
    return () => {
      abortController.abort()
    }
  }, []);
  return (
    <BlogsContext.Provider value={{ blogs }}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogsContext);
