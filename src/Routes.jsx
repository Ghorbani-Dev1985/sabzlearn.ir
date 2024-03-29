import Index from "./Pages/Index/Index";
import Course from "./Pages/Course/Course";
import Category from "./Pages/Category/Category";
import Blog from "./Pages/Blog/Blog";
import Blogs from "./Pages/Blogs/Blogs";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Layout from "./Layout/Layout";
import LayoutWithoutHeaderFooter from "./Layout/LayoutWithoutHeaderFooter";
import TermsConditions from "./Pages/TermsConditions/TermsConditions";
import NotFound from "./Pages/404/404";
import ContactUS from "./Pages/ContactUS/ContactUS";
import Search from "./Pages/Search.jsx/Search";
//Admin Dashboard
import AdminDashboard from "./Pages/AdminDashboard/Index";
import OverviewAdminDashboard from "./Pages/AdminDashboard/Overview/Overview";
import UsersAdminDashboard from "./Pages/AdminDashboard/Users/Users";
import CoursesAdminDashboard from "./Pages/AdminDashboard/Courses/Courses";
import MenusAdminDashboard from "./Pages/AdminDashboard/Menus/Menus";
import BlogsAdminDashboard from "./Pages/AdminDashboard/Blogs/Blogs";
import DraftAdminDashboard from "./Pages/AdminDashboard/Blogs/Draft";
import CategoryAdminDashboard from "./Pages/AdminDashboard/Category/Category";
import UsersMessagesAdminDashboard from "./Pages/AdminDashboard/UsersMessages/UsersMessages";
import CommentsAdminDashboard from "./Pages/AdminDashboard/Comments/Comments";
import SessionsAdminDashboard from "./Pages/AdminDashboard/Sessions/Sessions";
import TicketsMessagesAdminDashboard from "./Pages/AdminDashboard/Tickets/Tickets";
import DiscountAdminDashboard from "./Pages/AdminDashboard/Discounts/Discounts";
import CampaignAdminDashboard from "./Pages/AdminDashboard/Campaign/Campaign";

//MySabzlearn
import MySabzlearn from "./Pages/MySabzlearn/Index";
import OrdersMySabzlearn from "./Pages/MySabzlearn/Orders/Orders";
import CoursesMySabzlearn from "./Pages/MySabzlearn/Courses/Courses";
import TicketsMySabzlearn from "./Pages/MySabzlearn/Tickets/Tickets";
import ViewTicketMySabzlearn from "./Pages/MySabzlearn/Tickets/ViewTicket";
import EditProfileMySabzlearn from "./Pages/MySabzlearn/EditProfile/EditProfile";

//Private
import PrivateAdminDashboard from "./Components/Private/PrivateAdminDashboard";

let routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/courses/:page",
        element: <Courses />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/course/:courseName",
        element: <Course />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/category/:categoryName/:page",
        element: <Category />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/blogs/:page",
        element: <Blogs />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/blog/:blogName",
        element: <Blog />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/termsConditions",
        element: <TermsConditions />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/contactUS",
        element: <ContactUS />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/search/:value",
        element: <Search />,
      },
    ],
  },
  {
    element: <LayoutWithoutHeaderFooter />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <LayoutWithoutHeaderFooter />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/adminDashboard/*",
    element: (
      <PrivateAdminDashboard>
        <AdminDashboard />
      </PrivateAdminDashboard>
    ),
    children: [
      { path:  "overview", element: <OverviewAdminDashboard /> },
      { path: "users", element: <UsersAdminDashboard /> },
      { path: "courses", element: <CoursesAdminDashboard /> },
      { path: "sessions", element: <SessionsAdminDashboard /> },
      { path: "category", element: <CategoryAdminDashboard /> },
      { path: "comments", element: <CommentsAdminDashboard /> },
      { path: "menus", element: <MenusAdminDashboard /> },
      { path: "blogs", element: <BlogsAdminDashboard /> },
      { path: "blogs/draft/:shortName", element: <DraftAdminDashboard /> },
      { path: "messages", element: <UsersMessagesAdminDashboard /> },
      { path: "tickets", element: <TicketsMessagesAdminDashboard /> },
      { path: "discount", element: <DiscountAdminDashboard /> },
      { path: "campaign", element: <CampaignAdminDashboard /> },
    ],
  },
  {
    path: "/mySabzlearn/*",
    element: <MySabzlearn />,
    children: [
      { path: "orders", element: <OrdersMySabzlearn /> },
      { path: "courses", element: <CoursesMySabzlearn /> },
      { path: "tickets", element: <TicketsMySabzlearn /> },
      { path: "tickets/viewTicket/:id", element: <ViewTicketMySabzlearn /> },
      { path: "editProfile", element: <EditProfileMySabzlearn /> },
    ],
  },
  {
    element: <LayoutWithoutHeaderFooter />,
    children: [
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
