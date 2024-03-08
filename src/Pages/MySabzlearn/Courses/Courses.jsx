import React, { useState } from "react";
import { useShowLoading } from "../../../Contexts/ShowLoadingContext";
import useTitle from "../../../Hooks/useTitle";
import SkeletonLoading from "../../../Components/SkeletonLoading/SkeletonLoading";
import {
  FolderCopy,
  MonetizationOn,
  RocketLaunch,
} from "@mui/icons-material";
import { useDetailsModal } from "../../../Contexts/DetailsModalContext";
import { useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../../Utils/Utils";
import InfosBox from "../../../Components/InfosBoxInDashboard/InfosBoxInDashboard";
import { Link } from "react-router-dom";

function Courses() {
  const title = useTitle("دوره‌های من - سبزلرن ");
  const { isShowLoading, setIsShowLoading } = useShowLoading();
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const [userCourses, setUserCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`${BaseURL}users/courses/`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((response) => {
        console.log(response.data.course);
        setUserCourses(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  console.log(userCourses);
  return (
    <>
      <div className="flex-center flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-14">
        <InfosBox
          color={"bg-amber-600 dark:bg-yellow-400"}
          title=" دوره های ثبت نام شده "
          count={userCourses.length}
          icon={<FolderCopy className="text-white size-12" />}
        />
        <InfosBox
          color={"bg-sky-500 dark:bg-secondary"}
          title=" دوره های نقدی "
          count={userCourses.filter((course) => course.price !== 0).length}
          icon={<MonetizationOn className="text-white size-12" />}
        />
        <InfosBox
          color={"bg-primary"}
          title=" دوره های رایگان "
          count={userCourses.filter((course) => course.price === 0).length}
          icon={<RocketLaunch className="text-white size-12" />}
        />
      </div>
      {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="grid grid-rows-2 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {userCourses.map((course) => {
              let randomNumber = Math.floor(Math.random() * 101);
              return (
                <React.Fragment key={course.course._id}>
                  <div className="course flex flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:border dark:border-gray-700 rounded-2xl">
                    {/*  Course Banner  */}
                    <div className="relative h-42">
                      <Link
                        to={`/course/${course.course.shortName}`}
                        className="w-full h-full block"
                        title="آموزش جاوا اسکریپت رایگان مقدماتی تا پیشرفته + مینی پروژه"
                      >
                        <img
                          className="block w-full h-full object-cover rounded-2xl"
                          src={`https://sabzlearnapi.liara.run/courses/covers/${course.course.cover}`}
                          alt={course.course.name}
                        />
                      </Link>
                    </div>
                    {/* Course Body */}
                    <div className="px-5 pb-3.5 pt-2.5 flex-grow ">
                      {/* Course Title */}
                      <h4 className="font-danaMedium h-16 line-clamp-2 text-zinc-700 dark:text-white mb-2.5">
                        <Link to={`/course/${course.course.shortName}`}>
                          {course.course.name}
                        </Link>
                      </h4>
                      {/* Course Footer */}
                      <div className="pt-3 border-t border-t-gray-100 dark:border-t-gray-700">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-zinc-700 dark:text-white">
                            میزان مشاهده
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {randomNumber}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${randomNumber}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Courses;
