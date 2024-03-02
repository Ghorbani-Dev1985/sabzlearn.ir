import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/AdminDashboard/SideBar/SideBar";
import TopBar from "../../Components/AdminDashboard/TopBar/TopBar";


function Index() {
  return (
    <main className="md:bg-white md:dark:bg-gray-800 grid grid-cols-12 gap-x-10 2xl:gap-x-14 lg:px-8 xl:px-14 2xl:px-25 lg:py-7">
  
      <SideBar />
      <section className="w-full col-span-12 lg:col-span-9 xl:col-span-10 mx-auto bg-gray-50 dark:bg-gray-main md:p-10 lg:rounded-4xl">
        <TopBar />
        <div className="px-5 md:px-0">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default Index;
