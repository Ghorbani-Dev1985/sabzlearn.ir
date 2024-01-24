import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";



let routes = [
    {path: '/' , element: <Index />},
    {path: '/courseInfo/:courseName' , element: <CourseInfo />},
    {path: '/category/:categoryName' , element: <Category />},
    {path: '/articleInfo/:articleName' , element: <ArticleInfo />},
]

export default routes;