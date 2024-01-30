import Index from "./Pages/Index/Index";
import Course from "./Pages/Course/Course";
import Category from "./Pages/Category/Category";
import Blog from "./Pages/Blog/Blog";
import Blogs from "./Pages/Blogs/Blogs";



let routes = [
    {path: '/' , element: <Index />},
    {path: '/course/:courseName' , element: <Course />},
    {path: '/category/:categoryName' , element: <Category />},
    {path: 'blogs' , element: <Blogs />},
    {path: '/blog/:blogName' , element: <Blog />},
]

export default routes;