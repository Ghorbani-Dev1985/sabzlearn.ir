import { createContext, useContext, useEffect, useState } from "react";
import ApiRequest from "../Services/Axios/Configs/Config";

const BlogsContext = createContext();

export const BlogsContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [blogIsShowLoading  , setBlogIsShowLoading] = useState(false)
  const abortController = new AbortController()
  useEffect(() => {
    setBlogIsShowLoading(true)
    const ResponseResult = ApiRequest('articles' , {signal: abortController.signal})
    .then((response) => {
      setBlogs(response.data)
      setBlogIsShowLoading(false)
    });
    return () => {
      abortController.abort()
    }
  }, []);
  return (
    <BlogsContext.Provider value={{ blogs , blogIsShowLoading}}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogsContext);
