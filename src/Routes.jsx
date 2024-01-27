import Index from "./Pages/Index/Index";
import Course from "./Pages/Course/Course";
import Category from "./Pages/Category/Category";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";



let routes = [
    {path: '/' , element: <Index />},
    {path: '/course/:courseName' , element: <Course />},
    {path: '/category/:categoryName' , element: <Category />},
    {path: '/articleInfo/:articleName' , element: <ArticleInfo />},
]

export default routes;