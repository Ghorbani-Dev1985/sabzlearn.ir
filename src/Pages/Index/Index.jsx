import React from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import LastCourses from "../../Components/LastCourses/LastCourses";
import RoadMap from "../../Components/RoadMap/RoadMap";
import WhatHelp from "../../Components/WhatHelp/WhatHelp";
import NewCourses from "../../Components/NewCourses/NewCourses";

function Index() {
  return (
    <>
      <HeroSection />
      <LastCourses />
      <RoadMap />
      <WhatHelp />
      <NewCourses />
    </>
  );
}

export default Index;
