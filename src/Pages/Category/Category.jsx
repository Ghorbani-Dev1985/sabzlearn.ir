import { Search, VerticalAlignCenterOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import CourseCard from "../../Components/CourseCard/CourseCard";
import TopSort from "../../Components/TopSort/TopSort";
import useTitle from "../../Hooks/useTitle";
import TopPageTitle from "../../Components/TopPageTitle/TopPageTitle";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import Pagination from "../../Components/Pagination/Pagination";
import ApiRequest from "../../Services/Axios/Configs/Config";
import CourseSkeleton from "../../common/CourseSkeleton/CourseSkeleton";

function Category() {
  const { categoryName } = useParams();
  const [courseByCategory, setCourseByCategory] = useState([]);
  const [categoryIsShowLoading, setCategoryIsShowLoading] = useState(false);
  const [showItems, setShowItems] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const SearchChangeHandler = (event) => {
    setSearchValue(event.target.value);
    if (searchValue.length >= 1) {
      const filterBySearch = courseByCategory.filter((course) =>
        course.name.trim().toLowerCase().includes(event.target.value)
      );
      setFilteredCourses(filterBySearch);
    }
  };
  useEffect(() => {
    setCategoryIsShowLoading(true);
    const ResponseResult = ApiRequest(`courses/category/${categoryName}`).then(
      (categoryInfo) => {
        setCourseByCategory(categoryInfo.data);
        setFilteredCourses(categoryInfo.data);
        setCategoryIsShowLoading(false);
      }
    );
  }, [categoryName]);
  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourses = courseByCategory.filter(
          (courses) => courses.price === 0
        );
        setFilteredCourses(freeCourses);
        break;
      }
      case "money": {
        const moneyCourses = courseByCategory.filter(
          (courses) => courses.price !== 0
        );
        setFilteredCourses(moneyCourses);
        break;
      }
      case "presell": {
        const presellCourses = courseByCategory.filter(
          (courses) => courses.isComplete === 0
        );
        setFilteredCourses(presellCourses);
        break;
      }
      case "first": {
        const reverseCourses = courseByCategory.slice().reverse();
        setFilteredCourses(reverseCourses);
        break;
      }
      case "cheap": {
        let originalArray = [...courseByCategory];
        const cheapCourses = originalArray.sort((a, b) =>
          a.price > b.price ? 1 : -1
        );
        setFilteredCourses(cheapCourses);
        break;
      }
      case "expensive": {
        let originalArray = [...courseByCategory];
        const expensiveCourses = originalArray.sort((a, b) =>
          a.price < b.price ? 1 : -1
        );
        setFilteredCourses(expensiveCourses);
        break;
      }
      case "popular": {
        const reverseCourses = courseByCategory.filter(
          (courses) => courses.courseAverageScore === 5
        );
        setFilteredCourses(reverseCourses);
        break;
      }
      default: {
        setFilteredCourses(courseByCategory);
        break;
      }
    }
  }, [status]);
  return (
    <>
      {/* Category Title */}
      <TopPageTitle
        title="تعداد دوره"
        countCourse={filteredCourses.length}
        bgColor="bg-rose-500"
      />

      {/* Main Section */}
      <section className="grid items-start grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 mt-9 sm:mt-25">
        {/* Sidebar */}
        <SearchFilter
          setStatus={setStatus}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          SearchChangeHandler={SearchChangeHandler}
        />
        {/* Main Content */}
        <section className="col-span-1 lg:col-span-2 xl:col-span-3 order-1 lg:order-2">
          {/* Sort */}
          <TopSort
            BtnOne=" همه دوره ها"
            BtnTwo="جدیدترین"
            BtnThree=" ارزان ترین"
            BtnFour="گران ترین"
            BtnFive="پرمخاطب‌ها"
            status={status}
            setStatus={setStatus}
          />
          {/* Course List */}
          <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-5">
            {categoryIsShowLoading ? (
              <CourseSkeleton listsToRender={9} />
            ) : filteredCourses.length > 0 ? (
              showItems.map(
                ({
                  _id,
                  shortName,
                  cover,
                  name,
                  description,
                  creator,
                  price,
                  courseAverageScore,
                }) => {
                  return (
                    <React.Fragment key={_id}>
                      <CourseCard
                        shortName={shortName}
                        cover={cover}
                        name={name}
                        description={description}
                        creator={creator}
                        price={price}
                        courseAverageScore={courseAverageScore}
                      />
                    </React.Fragment>
                  );
                }
              )
            ) : (
              <div className="col-span-3">
                {" "}
                <Alert
                  severity="info"
                  className="dark:bg-mainSlate dark:text-sky-500"
                >
                  هیچ دوره ای با چنین مشخصات یافت نگردیده است
                </Alert>
              </div>
            )}

            {filteredCourses.length > 0 ? (
              <div className="flex-center col-span-3 my-8">
                <Pagination
                  items={filteredCourses}
                  itemsCount={9}
                  pathname={`/category/${categoryName}`}
                  setShowItems={setShowItems}
                />
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </>
  );
}

export default Category;
