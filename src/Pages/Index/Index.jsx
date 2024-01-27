import React from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import LastCourses from "../../Components/LastCourses/LastCourses";
import RoadMap from "../../Components/RoadMap/RoadMap";
import WhatHelp from "../../Components/WhatHelp/WhatHelp";
import NewCourses from "../../Components/NewCourses/NewCourses";
import LastArticle from "../../Components/LastArticle/LastArticle";
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
      <LastArticle />
      <InstagramPage />
      <PresellCourses />
      <PopularCourses />
    </>
  );
}

export default Index;
