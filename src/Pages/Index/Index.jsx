import React from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import LastCourses from "../../Components/LastCourses/LastCourses";
import RoadMap from "../../Components/RoadMap/RoadMap";
import WhatHelp from "../../Components/WhatHelp/WhatHelp";
import NewCourses from "../../Components/NewCourses/NewCourses";
import LastBlogs from "../../Components/LastBlogs/LastBlogs";
import InstagramPage from "../../Components/InstagramPage/InstagramPage";
import PresellCourses from "../../Components/PresellCourses/PresellCourses";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";


function Index() {
  return (
    <>
      <HeroSection />
      <LastCourses />
      <RoadMap />
      <WhatHelp />
      <NewCourses />
      <LastBlogs />
      <InstagramPage />
      <PresellCourses />
      <PopularCourses />
    </>
  );
}

export default Index;
