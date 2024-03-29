import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  GppGoodOutlined,
  Logout,
  Star,
  ExpandMore,
  PlayCircleFilledWhiteOutlined,
  ContentCopyOutlined,
  LockOutlined,
} from "@mui/icons-material";
import TomanDark from "../../assets/Images/svgs/toman-black.svg";
import TomanLight from "../../assets/Images/svgs/toman-white.svg";
import { usePublicDarkMode } from "../../Contexts/DarkModeContext";
import StatusIcon from "../../assets/Images/svgs/status.svg";
import courseCategory from "../../assets/Images/svgs/courseCategory.svg";
import LastUpdate from "../../assets/Images/svgs/lastUpdate.svg";
import SupportWay from "../../assets/Images/svgs/supportWay.svg";
import Prerequisite from "../../assets/Images/svgs/prerequisite.svg";
import ViewType from "../../assets/Images/svgs/viewType.svg";
import Users from "../../assets/Images/svgs/users.svg";
import User from "../../assets/Images/Users/597980f98a372b658b24996aa34ff1d5.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Skeleton,
} from "@mui/material"
import toast from "react-hot-toast";
import ShowHtmlTemplate from "../../Components/ShowHtmlTemplate/ShowHtmlTemplate";
import Comment from "../../Components/Comment/Comment";
import ShortLink from "../../Components/ShortLink/ShortLink";
import Button from "../../common/Form/Button";
import { useAuth } from "../../Contexts/AuthContext";
import { ChangeGregorianDateToPersian } from "../../Utils/Utils";
import FreePrice from "../../common/FreePrice/FreePrice";
import DOMPurify from 'dompurify'
import Swal from "sweetalert2";
import useFetch from "../../Hooks/useFetch";
import ApiRequest from "../../Services/Axios/Configs/Config";


function Course() {
  const { colorTheme } = usePublicDarkMode();
  const { courseName } = useParams()
  const { isLoggedIn, userInfos } = useAuth();
  const {datas : RelatedCourses} = useFetch(`courses/related/${courseName}`)
  const Navigate = useNavigate()
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [creator, setCreator] = useState([]);
  const [category, setCategory] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [courseDetails, setCourseDetails] = useState({});

  const NewCommentHandler = () => {
    if (isLoggedIn) {
      setShowNewCommentForm((prev) => !prev);
    } else {
      toast.error("لطفا ابتدا در سایت وارد شوید");
    }
  };
  const GetCourseDetails = () => {
    const ResponseResult = ApiRequest(`courses/${courseName}`)
  .then((courseInfo) => {
      setComments(courseInfo.data.comments);
      setCreator(courseInfo.data.creator);
      setSessions(courseInfo.data.sessions);
      setCategory(courseInfo.data.categoryID);
      setCourseDetails(courseInfo.data);
      document.title = courseInfo.data.name;
    })
  }
  const RegisterCourseHandler = () => {
    if(courseDetails.price === 0){
      const ResponseResult = ApiRequest.post(`courses/${courseDetails._id}/register` , {price: courseDetails.price})
      .then(response => {
        if(response.status === 201 || response.status === 200){
          toast.success(" ثبت نام در دوره با موفقت انجام شد")
          GetCourseDetails()
        }else{
          toast.error("ثبت نام در دوره انجام نشد");
        }
      })
    }else{
      Swal.fire({
        title: "کد تخفیف دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#3f3f46",
        confirmButtonText: "ورود کد تخفیف",
        cancelButtonText: "خیر",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'لطفا کد تخفیف را وارد کنید',
           input: 'text',
            showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#3f3f46",
        confirmButtonText: "ادامه",
        cancelButtonText: "ثبت بدون کد تخفیف",
          }).then(result => {
            if(!result.isConfirmed){
              const ResponseResult = ApiRequest.post(`courses/${courseDetails._id}/register` , {price: courseDetails.price})
              .then(response => {
                console.log(response)
                if(response.status === 201 || response.status === 200){
                  toast.success(" ثبت نام در دوره با موفقت انجام شد")
                  GetCourseDetails()
                }else{
                  toast.error("ثبت نام در دوره انجام نشد");
                }
              })
            }else{
              console.log(result)
              const ResponseResult = ApiRequest.post(`offs/${result.value}` , {price: courseDetails.price})
              .then(response => {
                console.log(response.data)
                const ResponseResult = ApiRequest.post(`courses/${courseDetails._id}/register` , {price: courseDetails.price - (courseDetails.price  * +response.data.percent / 100)})
                .then(response => {
                  if(response.status === 201){
                    toast.success(" ثبت نام در دوره با موفقت انجام شد")
                    GetCourseDetails()
                  }
                })
              })
            }
          })
        }
      });
    }
  }
  useEffect(() => {
    GetCourseDetails()
  }, [courseName]);
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        linkOneTo="/courses/1"
        linkOneTitle="دوره ها "
        linkTwoTo={`/category/${category.name}/1`}
        linkTwoTitle="ارتقای مهارت "
        linkThreeTitle="توسعه کتابخانه با جاوااسکریپت"
      />
      {/* Head */}
      <section className="flex-between flex-col-reverse lg:flex-row xl:items-stretch gap-x-5 xl:gap-x-10 bg-white dark:bg-gray-800 sm:bg-transparent sm:dark:bg-transparent p-3.5 sm:p-0 mt-5 mb-4 sm:my-10 rounded-2xl">
        {/* Info */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <h1 className="font-MorabbaBold text-2xl/[42px] sm:text-3xl/[48px] lg:text-[32px]/[48px] text-zinc-700 dark:text-white lg:line-clamp-2">
              {
                courseDetails.name ? courseDetails.name :
              <Skeleton variant="text" width={'80%'} height={50} />
              }
              
            </h1>
            <div className="font-Dana text-xl/8 line-clamp-4 lg:line-clamp-2 xl:line-clamp-3 mt-3.5 xl:mt-5 text-zinc-700 dark:text-white">
              {
                courseDetails.description ? <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(courseDetails.description) }} /> :
                <Skeleton variant="text" width={'100%'} height={150} />
              }
              
            </div>
          </div>
          {/* Btn & Price */}
          <div className="mt-5 pt-5 sm:pt-0 xl:mt-0 border-t sm:border-t-0 border-t-gray-100 dark:border-t-gray-700">
            <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-3.5 items-center">
              {
                courseDetails.isUserRegisteredToThisCourse ? (
                  <Button
                    btnType="submit"
                    className="w-full flex-center sm:w-auto button-xl rounded-lg button-secondary"
                    disabled={false}
                  >
                    <PlayCircleFilledWhiteOutlined /> مشاهده دوره
                  </Button>
                ) : (
                  <Button
                    btnType="submit"
                    className="w-full flex-center sm:w-auto button-xl rounded-lg button-primary"
                    disabled={false}
                    onClick={RegisterCourseHandler}
                  >
                    <GppGoodOutlined /> شرکت در دوره
                  </Button>
                )
              }

              <div className="text-center sm:text-right mb-5 sm:mb-0">
                <div className="flex-center sm:justify-end mb-1">
                  <div className="flex-center gap-1 font-DanaBold text-3xl text-zinc-700 dark:text-white mr-4 sm:mr-2">
                     {
                      courseDetails.price === 0 || courseDetails.price > 0 ?
                    courseDetails.price > 0 ? (
                      <>
                      <div className="flex flex-col gap-3">
                        <p className="line-through font-Dana text-zinc-400 dark:text-slate-400">{courseDetails.price.toLocaleString()}</p>
                          <p className="flex-center gap-1">
                        {courseDetails.discount && (courseDetails.price - (courseDetails.price * (courseDetails.discount) / 100)).toLocaleString()}
                        {colorTheme === "light" ? (
                          <img
                            src={TomanLight}
                            alt="ghorbani-dev.ir"
                            className="size-6"
                          />
                        ) : (
                          <img
                            src={TomanDark}
                            alt="ghorbani-dev.ir"
                            className="size-6"
                          />
                        )}
                          </p>
                      </div>
                      </>
                    ) : (
                      <FreePrice />
                    ) :
                     <Skeleton variant="text" width={100} height={40} />
                     }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner */}
        <div className="shrink-0 mb-3 sm:mb-6 lg:mb-0 w-full h-auto md:w-10/12 lg:w-[440px] lg:h-[270px] xl:w-[610px] xl:h-[343px] rounded-2xl sm:rounded-3xl overflow-hidden">
          {
            courseDetails.cover ? 
            <img src={`https://sabzlearnapi.liara.run/courses/covers/${courseDetails.cover}`} alt="gorbani-dev.ir" /> :
            <Skeleton variant="text" width={'100%'} height={'100%'} />
          }
        </div>
      </section>
      {/* Data */}
      <section className="flex items-start lg:flex-nowrap flex-wrap gap-5">
        <div className="w-full">
          {/* Details */}
          <div className="grid grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-5">

              <DetailBoxInfo
                icon={StatusIcon}
                title="وضعیت دوره"
                subTitle={courseDetails.isComplete ? "تکمیل شده" : "در حال ضبط"}
              />           
            {
              category.title ? 
              <DetailBoxInfo
                icon={courseCategory}
                title="دسته بندی"
                subTitle={category.title}
              /> :
              <Skeleton variant="text" width={100} height={40} />
            }
            {
              courseDetails.createdAt ? 
              <DetailBoxInfo
                icon={LastUpdate}
                title=" آخرین به روز رسانی   "
                subTitle={
                  courseDetails.createdAt &&
                  ChangeGregorianDateToPersian(courseDetails.createdAt)
                }
              /> :
              <Skeleton variant="text" width={100} height={40} />
            }
            {
              courseDetails.support ? 
              <DetailBoxInfo
                icon={SupportWay}
                title=" روش پشتیبانی"
                subTitle={courseDetails.support}
              /> :
              <Skeleton variant="text" width={100} height={40} />
            }
            <DetailBoxInfo
              icon={Prerequisite}
              title="  پیش نیاز"
              subTitle="css & html"
            />
            <DetailBoxInfo
              icon={ViewType}
              title="  نوع مشاهده "
              subTitle="به صورت آنلان"
            />
          </div>
          {/* Student & Star & Progress In Mobile */}
          <div className="w-full lg:hidden bg-white dark:bg-gray-800 p-3.5 shadow-light dark:shadow-none rounded-2xl mt-3.5">
            <div className="flex gap-3.5">
              <div className="flex-between flex-grow bg-gray-100 dark:bg-gray-700 py-4 px-5 rounded-2xl">
                <img src={Users} alt="ghorbani-dev.ir" className="size-8" />
                <div className="flex-center flex-col">
                  <span className="font-DanaBold text-2xl text-zinc-700 dark:text-white">
                    {
                      courseDetails.courseStudentsCount
                    }
                  </span>
                  <p className="text-slate-500 dark:text-gray-500 text-sm">
                    دانشجو
                  </p>
                </div>
              </div>
              <div className="flex-between flex-grow bg-gray-100 dark:bg-gray-700 py-4 px-5 rounded-2xl">
                <Star className="size-8 text-amber-400 dark:text-yellow-400" />
                <div className="flex-center flex-col">
                  <span className="font-DanaBold text-2xl text-zinc-700 dark:text-white">
                    5.0
                  </span>
                  <p className="text-slate-500 dark:text-gray-500 text-sm">
                    رضایت
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex-between mb-3 text-zinc-700 dark:text-white text-xl">
                <span>درصد تکمیل دوره</span>
                <span>20%</span>
              </div>
              <progress
                value="20"
                max="100"
                className="w-full h-[0.625rem] align-baseline"
              ></progress>
            </div>
          </div>
          {/* Teacher Section In Mobile */}
          <div className="w-full lg:hidden bg-white dark:bg-gray-800 pt-5 pb-3.5 px-3.5 xs:px-5 shadow-light dark:shadow-none rounded-2xl mt-4">
            <div className="flex-center gap-x-2.5 pb-5 border-b border-b-gray-100 dark:border-b-mainSlate mb-3.5">
              <img
                src={User}
                className="block size-16 object-cover rounded-full"
                alt="ghorbani-dev.ir"
              />
              <div>
                <h4 className="text-zinc-700 dark:text-white text-2xl mb-1 font-DanaBold">
                  {
                    creator.name ?
                    creator.name :
                    <Skeleton variant="text" width={100} height={40} />
                  }
                </h4>
                <p className="text-slate-500 dark:text-gray-500 text-sm mt-1.5">
                  برنامه نویس و توسعه دهنده فول استک وب
                </p>
              </div>
            </div>
            <Link
              to="#"
              className="flex-center gap-x-1.5 text-slate-500 dark:text-gray-500 text-sm"
            >
              مشاهده پروفایل
              <Logout className="size-5" />
            </Link>
          </div>
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 px-3.5 md:px-5 pt-5 md:pt-7 pb-5 md:pb-6 shadow-light dark:shadow-none rounded-2xl mt-3.5 sm:mt-5">
            <div className="flex items-center gap-x-3.5 mb-5">
              <span className="block w-2.5 h-10 bg-amber-400 dark:bg-yellow-400 rounded-sm"></span>
              <h3 className="text-zinc-700 dark:text-white font-MorabbaBold text-2xl lg:text-3xl">
                توضیحات
              </h3>
            </div>
            <ShowHtmlTemplate
              showMoreDesc={showMoreDesc}
              setShowMoreDesc={setShowMoreDesc}
            >
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(courseDetails.description) }} />
            </ShowHtmlTemplate>
          </div>
          {/* Episode List */}
          <div className="bg-white dark:bg-gray-800 px-3.5 md:px-5 pt-5 md:pt-7 pb-3.5 md:pb-6 shadow-light dark:shadow-none rounded-2xl mt-4 sm:mt-5">
            <div className="flex-between flex-wrap mb-5">
              <div className="flex item-center gap-x-3.5">
                <span className="block w-2.5 h-10 bg-sky-500 dark:bg-secondary rounded-sm"></span>
                <h3 className="text-zinc-700 dark:text-white font-MorabbaBold text-2xl md:text-3xl">
                  سرفصل های دوره
                </h3>
              </div>
              <div className="text-zinc-700 dark:text-white">07:08</div>
            </div>
            {
              sessions ? 
              sessions.length > 0 ? (
                sessions.map(({ _id, time, free, title , video}, index) => {
                  return (
                    <React.Fragment key={_id}>
                      <Accordion className="w-full !rounded-2xl my-4 bg-gray-100 text-zinc-700 dark:bg-gray-700 dark:text-white before:hidden shadow-none transition-colors">
                        <AccordionSummary
                          expandIcon={<ExpandMore className="dark:text-white" />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          className="py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#4A4B6D]"
                        >
                          {title}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box className="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                            {!free ? (
                              <Link
                                to={`https://sabzlearn.ghorbani-dev.ir/courses/covers/${video}`}
                                target="_blank"
                                className="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]"
                              >
                                <span className="flex-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-DanaBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors">
                                  {index + 1}
                                </span>
                                <h4 className="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors">
                                  {title}
                                </h4>
                              </Link>
                            ) : (
                              <p className="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                                <span className="flex-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-DanaBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors">
                                  {index + 1}
                                </span>
                                <h4 className="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors">
                                  {title}
                                </h4>
                              </p>
                            )}
                            <Box className="w-full flex-between">
                              <span className="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-mainSlate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors">
                                {free ? "نقدی" : " جلسه رایگان"}
                              </span>
                              <Box className="flex items-center gap-x-1.5 md:gap-x-2">
                                <span className="text-slate-500 dark:text-gray-500 text-sm md:text-lg">
                                  {time}
                                </span>
                                {free ? (
                                  <LockOutlined className="w-5 h-6 md:size-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors" />
                                ) : (
                                  <PlayCircleFilledWhiteOutlined className="w-5 h-6 md:size-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors" />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </React.Fragment>
                  );
                })
              ) : (
                <Alert severity="info">تاکنون جلسه ای ثبت نگردیده است</Alert>
              ) :
              <Skeleton variant="text" width={'100%'} height={90} />
            }
          </div>
          {/* Comment */}
          {
            comments ?
            <Comment
              showNewCommentForm={showNewCommentForm}
              setShowNewCommentForm={setShowNewCommentForm}
              NewCommentHandler={NewCommentHandler}
              comments={comments}
            /> :
            <Skeleton variant="text" width={'100%'} height={100} />
          }
        </div>
        {/* Aside */}
        <aside className="w-80 xl:w-96 shrink-0 sticky top-36 space-y-5">
          {/* Students & Rating & Progress */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 p-5 shadow-light dark:shadow-none rounded-2xl">
            <div className="flex gap-5">
              <div className="flex-between flex-grow bg-gray-100 dark:bg-gray-700 py-4 px-5 rounded-2xl">
                <img src={Users} alt="ghorbani-dev.ir" className="size-8" />
                <div className="flex-center flex-col">
                  <span className="font-DanaBold text-2xl text-zinc-700 dark:text-white">
                    {
                      courseDetails.courseStudentsCount }
                  </span>
                  <p className="text-slate-500 dark:text-gray-500 text-sm">
                    دانشجو
                  </p>
                </div>
              </div>
              <div className="flex-between flex-grow bg-gray-100 dark:bg-gray-700 py-4 px-5 rounded-2xl">
                <Star className="size-8 text-amber-400 dark:text-yellow-400" />
                <div className="flex-center flex-col">
                  <span className="font-DanaBold text-2xl text-zinc-700 dark:text-white">
                    5.0
                  </span>
                  <p className="text-slate-500 dark:text-gray-500 text-sm">
                    رضایت
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex-between mb-3 text-zinc-700 dark:text-white text-xl">
                <span>درصد تکمیل دوره</span>
                <span>20%</span>
              </div>
              <progress
                value="20"
                max="100"
                className="w-full h-[0.625rem] align-baseline"
              ></progress>
            </div>
          </div>
          {/* Teacher Section In Mobile */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 px-5 py-6 shadow-light dark:shadow-none rounded-2xl text-center">
            {
              creator.profile ?
              <img
                src={`https://sabzlearnapi.liara.run/courses/covers/${creator.profile}`}
                className="block mx-auto mb-2 w-[90px] h-[90px] rounded-full"
                alt={creator.name}
              /> :
              <Skeleton variant="circular" width={90} height={90} className="block mx-auto"/>
            }
            <h4 className="text-zinc-700 dark:text-white text-2xl mb-1">
              {
                creator.name ? 
                creator.name :
                <Skeleton variant="text" width={100} height={40} />
              }
            </h4>
            <Link
              to="#"
              className="flex-center my-3 gap-x-1.5 text-slate-500 dark:text-gray-500 text-sm"
            >
              مدرس دوره
              <Logout className="size-5" />
            </Link>
            <p className="text-zinc-700 dark:text-white font-danaLight mt-2.5">
             {
              creator.username === 'qadir_yolme' && ''
             }
             {
              creator.username === 'amin_saeedi' && <p>
                اولین کدم رو 14 سالگی زدم، حدود 9 سال پیش که با زبان ویژوال بیسیک
                بود و بعد حدودا 2 سال تو فیلد برنامه نویسی موبایل با زبان جاوا کار
                کردم و در نهایت با عشقی به اسم جاوا اسکریپت آشنا شدم و حدودا یه 7
                سالی هست جاوا اسکریپت کد می‌زنم و به صورت Mern Stack فعالیت
                می‌کنم.
              </p>
             }
             {
              creator.username === 'HamidrezaEbadi' && 'توسعه دهنده فرانت سبزلرن'
             }
             {
              creator.username === 'rezadolati01' && <p>
                تقریبا 10 ساله در زمینه برنامه نویسی فعال هستم، 5 سال پیش اولین شرکت خودم رو تاسیس کردم، 1 سال پیش اولین فروشگاه اینترنتی خودم رو توسعه دادم. عاشق زبان برنامه نویسی پایتون هستم و در کنار پایتون زبان های دیگه ای رو هم کار میکنم. در حال حاضر، توسعه دهنده بک اند با جنگو و فارغ التحصیل رشته امنیت از دانشگاه سراسری تبریز هستم و 3 ساله در زمینه هوش مصنوعی هم فعالیت میکنم.
              </p>
             }
             {
              creator.username === 'amscan77' && <p>
                تقریبا 8 سالی هست که تو حوزه هک و امنیت فعالیت میکنم علاقه اصلیم بحث تهاجمی (Offensive) هست ، 3 سالی هست که توی حوزه تیم قرمز (RedTeam) فعالیت میکنم و به نظرم همه حوزه های هک جذابه و نمیشه از دستش داد :)
              </p>
             }
             {
              creator.username === 'moein123' && <p>
              سال ۹۷ وارد دنیای برنامه نویسی شدم و الان ۵ ساله توی این بازی ام، از دروازه php و فریمورک هاش مثل کُدِگنایتر و لاراول کارمو شروع کردم و بعد تر تجربه کد زدن با nodeJs, expressJs و NestJs رو داشتم. یاد دادن همیشه برام کار جذابی بوده و خوب انجامش دادم ولی هیچوقت خودمو استاد ندونستم و نمیدونم. امیدوارم بتونم برات رفیق خوبی توی مسیر یادگیری بهتر برنامه نویسی باشم:)
              </p>
             }
             {
              creator.username === 'mehrshad_b' && <p>
                مهرشاد براتی هستم برنامه نویس و توسعه دهنده فول استک وب و دانشجوی ارشد رشته کامپیوتر گرایش نرم افزار
              </p>
             }
            </p>
          </div>
           {/* New Blogs */}
           <div className="hidden lg:block dark:border border-gray-700 shadow-light dark:shadow-none bg-white dark:bg-gray-800 rounded-2xl py-6 px-6 xl:px-10">
            <span className="flex items-center gap-x-2.5 mb-5 -mr-6 xl:-mr-10 text-zinc-700 dark:text-white font-danaDemiBold text-2xl">
              <span className="block w-7 h-2 bg-emerald-500 rounded-l-sm -mr-px"></span>
              دوره‌های مرتبط
            </span>
            <div className="flex flex-col font-danaLight text-xl text-zinc-700 dark:text-white last:child:pb-0 last:child:border-b-0 child:py-3 child:border-b child:border-dashed child:border-b-slate-500 dark:child:border-b-gray-500">
              {
                RelatedCourses ?
                RelatedCourses.map(({_id, shortName, name }) => {
                  return (
                    <React.Fragment key={_id}>
                      <Link to={`/course/${shortName}`}>{name}</Link>
                    </React.Fragment>
                  );
                }) :
                <>
                <Skeleton variant="text" width={'100%'} height={40} />
                <Skeleton variant="text" width={'100%'} height={40} />
                <Skeleton variant="text" width={'100%'} height={40} />
                <Skeleton variant="text" width={'100%'} height={40} />
                </>
              }
            </div>
          </div>
          {/* Short Link */}
          <ShortLink bgColor="bg-sky-500" link="https://sabzlearn.ir/?p=2862" />
        </aside>
      </section>
    </>
  );
}

export default Course;

const DetailBoxInfo = ({ icon, title, subTitle }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-y-2 gap-x-4 text-center md:text-right bg-white dark:bg-gray-800 p-3.5 sm:p-5 shadow-light dark:shadow-none rounded-2xl">
      <img src={icon} alt="ghorbani-dev.ir" />
      <div>
        <h4 className="font-DanaBold text-lg text-zinc-700 dark:text-white">
          {title}
        </h4>
        <p className="text-slate-500 dark:text-gray-500 text-xs mt-0.5 sm:mt-1.5">
          {subTitle}
        </p>
      </div>
    </div>
  );
};
export { DetailBoxInfo };
