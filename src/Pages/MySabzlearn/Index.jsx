import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../Components/MySabzlearn/SideBar/SideBar";
import TopBar from "../../Components/MySabzlearn/TopBar/TopBar";
import toast from "react-hot-toast";
import axios from "axios";
import { BaseURL } from "../../Utils/Utils";
import { useAuth } from "../../Contexts/AuthContext";

function Index() {
  const Navigate = useNavigate();
  const {isLoggedIn} = useAuth()
  
  console.log(isLoggedIn)

  return (
    <main className="md:bg-white md:dark:bg-gray-800 flex gap-x-10 2xl:gap-x-14 lg:px-8 xl:px-14 2xl:px-25 lg:py-7">
      <SideBar />
      <section className="w-full max-w-[1432px] mx-auto bg-gray-100 dark:bg-gray-main md:p-10 lg:rounded-4xl">
        <TopBar />
        <div className="px-5 md:px-0">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default Index;
