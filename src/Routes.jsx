import Index from "./Pages/Index/Index";
import Course from "./Pages/Course/Course";
import Category from "./Pages/Category/Category";
import Blog from "./Pages/Blog/Blog";
import Blogs from "./Pages/Blogs/Blogs";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Layout from "./Layout/Layout";
import LayoutWithoutHeaderFooter from './Layout/LayoutWithoutHeaderFooter'


let routes = [
    {element: <Layout /> , children: [
        {
            path: '/',
            element: <Index />
        }
    ]},
    {element: <Layout /> , children: [
        {
            path: '/courses',
            element: <Courses />
        }
    ]},
    {element: <Layout /> , children: [
        {
            path: '/course/:courseName',
            element: <Course />
        }
    ]},
    {element: <Layout /> , children: [
        {
            path: '/category/:categoryName',
            element: <Category />
        }
    ]},
    {element: <Layout /> , children: [
        {
            path: '/blogs',
            element: <Blogs />
        }
    ]},
    {element: <Layout /> , children: [
        {
            path: '/blog/:blogName',
            element: <Blog />
        }
    ]},
    {element: <LayoutWithoutHeaderFooter /> , children : [
        { 
            path: '/login',
            element: <Login />
        }
    ]},
    {element: <LayoutWithoutHeaderFooter /> , children : [
        { 
            path: '/register',
            element: <Register />
        }
    ]},
]


export default routes ;