import React, { useRef, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import {
  GppGoodOutlined,
  Logout,
  Star,
  ExpandMore,
  PlayCircleFilledWhiteOutlined,
  ContentCopyOutlined,
} from "@mui/icons-material";
import TomanDark from "../../assets/Images/svgs/toman-black.svg";
import TomanLight from "../../assets/Images/svgs/toman-white.svg";
import Banner from "../../assets/Images/Courses/Course-thumbnail-Dashboard2-1-768x432.webp";
import { usePublicDarkMode } from "../../Contexts/DarkModeContext";
import StatusIcon from "../../assets/Images/svgs/status.svg";
import CourseTime from "../../assets/Images/svgs/courseTime.svg";
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
  Box,
} from "@mui/material";
import NewCommentForm from "../../Components/NewCommentForm/NewCommentForm";
import toast from "react-hot-toast";
import CommentItem from "../../Components/CommentItem/CommentItem";
import ShowHtmlTemplate from "../../Components/ShowHtmlTemplate/ShowHtmlTemplate";

function Course() {
  const { colorTheme } = usePublicDarkMode();
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const CourseShortLink = useRef(null)
  const NewCommentHandler = () => {
    let isLogin = false;
    if (isLogin) {
      setShowNewCommentForm((prev) => !prev);
    } else {
      toast.error("لطفا ابتدا در سایت وارد شوید");
    }
  };
  const CopyInClipboardHandler = (event) => {
    let CourseShortLinkText = CourseShortLink.current.innerText
    if(CourseShortLinkText){
      navigator.clipboard.writeText(CourseShortLinkText)
      toast.success('لینک کپی شد')
    }else{
      toast.error('کپی انجام نشد')
    }
  }
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />
      {/* Head */}
      <section className="flex-between flex-col-reverse lg:flex-row xl:items-stretch gap-x-5 xl:gap-x-10 bg-white dark:bg-gray-800 sm:bg-transparent sm:dark:bg-transparent p-3.5 sm:p-0 mt-5 mb-4 sm:my-10 rounded-2xl">
        {/* Info */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <h1 className="font-MorabbaBold text-2xl/[42px] sm:text-3xl/[48px] lg:text-[32px]/[48px] text-zinc-700 dark:text-white lg:line-clamp-2">
              توسعه کتابخانه با جاوااسکریپت
            </h1>
            <p className="font-Dana text-xl/8 line-clamp-4 lg:line-clamp-2 xl:line-clamp-3 mt-3.5 xl:mt-5 text-zinc-700 dark:text-white">
              توسعه کتابخانه، نمونه کاری قوی برای رزومه شما است و این دوره
              آموزشی یادگیری چنین مهارتی رو با نکات کاربردی و کد نویسی و همچنین
              ساخت مستندات جامع و پروژه عملی فراهم میکند
            </p>
          </div>
          {/* Btn & Price */}
          <div className="mt-5 pt-5 sm:pt-0 xl:mt-0 border-t sm:border-t-0 border-t-gray-100 dark:border-t-gray-700">
            <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-3.5 items-center">
              <button className="w-full flex-center sm:w-auto button-xl rounded-lg button-primary">
                <GppGoodOutlined />
                شرکت در دوره
              </button>
              <div className="text-center sm:text-right mb-5 sm:mb-0">
                <div className="flex-center sm:justify-end mb-1">
                  <div className="flex-center gap-1 font-DanaBold text-3xl text-zinc-700 dark:text-white mr-4 sm:mr-2">
                    1,000,000
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner */}
        <div className="shrink-0 mb-3 sm:mb-6 lg:mb-0 w-full h-auto md:w-10/12 lg:w-[440px] lg:h-[270px] xl:w-[610px] xl:h-[343px] rounded-2xl sm:rounded-3xl overflow-hidden">
          <img src={Banner} alt="gorbani-dev.ir" />
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
              subTitle="پیش فروش"
            />
            <DetailBoxInfo
              icon={CourseTime}
              title=" مدت زمان دوره"
              subTitle="08:23"
            />
            <DetailBoxInfo
              icon={LastUpdate}
              title=" آخرین به روز رسانی   "
              subTitle="1402/02/10"
            />
            <DetailBoxInfo
              icon={SupportWay}
              title=" روش پشتیبانی"
              subTitle="آنلاین"
            />
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
                    284
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
                  مهرشاد براتی
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
             <ShowHtmlTemplate showMoreDesc={showMoreDesc} setShowMoreDesc={setShowMoreDesc}>
             <p>
                  دوره پیاده سازی داشبوردهای حرفه ای همون چیزی هست که ادمین و
                  مدیر یک وب سایت برای مشاهده، تحلیل و پایش اطلاعات مربوط به وب
                  سایت و کاربران به شکل حرفه ای تر به اون نیاز دارن.
                </p>
                <p>
                  همونطور که میدونید اتاق فرمان یک وب سایت، همون محیط ادمین یا
                  داشبورد مدیریتی هست که اطلاعات مربوط به محتوا، قالب، کاربران،
                  محصولات و … در اختیار شما هم هست تا علاوه بر مشاهده اطلاعات
                  مهم، در صورت لزوم تغییرات و به روزرسانی هایی هم در بخش های
                  مختلف انجام بدید. تصور کنید که روزی بخواید آمار فروش وب سایت
                  رو ببینید و بر اساس دیتای اون، برای کمپین های بازاریابی آینده
                  استراتژی تعریف کنید. وقتی آمار فروش رو باز می کنید، می بینید
                  هزاران رکورد از عدد و رقم در اختیار شماست که تو چند صفحه تقسیم
                  شده و شما نمیتونید با یک نگاه چیزی اون همه دیتا متوجه بشید. نه
                  گرافیکی، نه نموداری و نه هیچ چیز دیگه!
                </p>
                <p>
                  وقتی حرف این حجم از دیتای مهم باشه، طبیعتا هرچقدر نمایش و
                  مدیریت اونها برای مدیر، راحت تر، سریع تر و جذاب تر باشه،
                  بازدهی و لذت بیشتری هم به همراه خواهد داشت. پس اینکه چه نوع
                  دیتایی در کدام بخش پنل ادمین و به چه شکلی نمایش داده بشن که
                  مدیریت و مانیتورینگ اونها راحت باشه مسئله خیلی مهمی هست و یک
                  برنامه نویس حرفه ای باید بتونه این محیط رو با بالاترین
                  استانداردها طراحی کنه. موضوعی که هدف اصلی این دوره هست!
                </p>
                <p>
                  اگر بتونید برای پروژه هاتون داشبوردهای حرفه ای طراحی کنید که
                  نمای زیباتری داشته باشن و هم امکانات خوبی در اختیار ادمین قرار
                  بدن، قطعا اون کارفرما یا مدیر وب سایت رو بیشتر خوشحال میکنید
                  تا اینکه چندساعت در مورد تکنولوژی های به کار رفته در پروژه و …
                  توضیح بدید و اون هم با نگاه هایی از جنس ” ها ؟!” عکس العمل
                  نشون بده! بیاید ببینیم تو این دوره دقیقا چه خبره ؟! این دوره
                  چه فرقی با بقیه دوره ها داره؟ سبزلرن با سیاست خاصی که در
                  انتخاب استاد، تدوین محتوای آموزشی، قیمت گذاری دوره ها و
                  پشتیبانی موثر در نظر گرفته، میتونه این تضمین رو به شما بده که
                  در طول دوره آموزش، هیچ کمبودی در هیچ زمینه ای احساس نکنید.
                  بیاید چند مورد از ویژگی های مهم دوره آموزش پیاده سازی
                  داشبوردهای حرفه ای سبزلرن رو باهم بررسی کنیم. پروژه محور بودن
                </p>
                <p>
                  در این دوره سبزلرن استاد براتی علاوه بر تدریس مفاهیم، به صورت
                  کاملا عملی و پروژه محور یک داشبورد حرفه ای با ظاهر و امکانات
                  شگفت انگیز رو توسعه میده تا تمام نکات ریز و درشت این مهارت رو
                  یاد بگیرید. جالبه بدونید پروژه نهایی دوره دقیقا طبق اصول جاری
                  در شرکت های واقعی توسعه داده شده تا بتونید با چالش های واقعی
                  بازار کار هم آشنا شده و بعد از گذروندن دوره با آمادگی بالا
                  وارد بازار کار تخصص خودتون بشید. تمرکز زیاد روی درآمدزایی از
                  طراحی داشبورد شاید براتون جالب باشه که با یادگیری مهارت پیاده
                  سازی داشبوردهای حرفه ای، میتونید پروژه بگیرید و درآمد جداگانه
                  کسب کنید. رمز و راز این موضوع رو در استاد با شما به اشتراک
                  خواهد گذاشت. یونیک بودن دوره یکی از دغدغه های اساسی دانشجوها،
                  انتخاب بهترین گزینه از بین کلی دوره مشابه هست. اما در مورد
                  دوره پیاده سازی داشبوردهای حرفه ای سبزلرن، خیالتون باشه چون
                  هیچ دوره ای تا این اندازه جامع و تخصصی در این زمینه وجود نداره
                  که بخواید مقایسه کنید J پشتیبانی رایگان و مادام العمر این دوره
                  مثل بقیه دوره های سبزلرن پشتیبانی رایگان و مادام العمر داره.
                  یعنی شما حتی بعد از استخدام می تونید سوالات و ابهاماتی که
                  دارین رو توسط پشتیبانی دوره برطرف کنین. برای اطمینان از این
                  موضوع حتما یه سر به کامنت های دوره های مختلف بزنید. منتورشیپ
                  بودن دوره پشتیبانی دوره در گروه تلگرامی انجام میشه و علاوه بر
                  مدرس، چند نفر کمک پشتیبان مسلط هم جهت پاسخگویی و رفع مشکلات
                  شما حضور دارن. بنابراین برای دریافت راهنمایی و جواب سوالات،
                  درگیر تیکت و انتظار نمیشید و در سریع ترین زمان ممکن کارتون راه
                  میفته! خلاصه اینکه صدها برنامه نویس فوق حرفه ای که در دانشگاه
                  سبزلرن پرورش پیدا کردن الان تو شرکت های بزرگ مشغول هستن و
                  نتیجه انتخاب درست منبع آموزشی و تمرینات منظم خودشون رو گرفتن.
                  پس قطعا شما هم میتونید ردپای اونهارو دنبال کنید و به آرزوتون
                  برسید. آپدیت رایگان اگر نگاهی به سایر دوره ها بندازید، می
                  بینید که حتی با وجود گذشت چندماه یا چندسال از اتمام یک دوره،
                  آپدیت های رایگان اون در پنل دانشجوها قرار گرفته و به این ترتیب
                  برای آشنایی با آخرین تحولات اون تخصص، نیازی به گذروندن دوره
                  جدید پیدا نکردن. در واقع سعی بر این هست هر تغییرات عمده ای که
                  در موضوع یک دوره اتفاق بیفته، ویدیوی ضبط شده جدیدی به عنوان
                  آپدیت برای اون ارائه بشه.
                </p>
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
            <Accordion className="w-full !rounded-2xl bg-gray-100 text-zinc-700 dark:bg-gray-700 dark:text-white before:hidden shadow-none transition-colors">
              <AccordionSummary
                expandIcon={<ExpandMore className="dark:text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#4A4B6D]"
              >
                معرفی دوره و پیش نیاز ها
              </AccordionSummary>
              <AccordionDetails>
                <Box className="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                  <Link
                    to=""
                    className="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]"
                  >
                    <span className="flex-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-DanaBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors">
                      1
                    </span>
                    <h4 className="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors">
                      معرفی دوره
                    </h4>
                  </Link>
                  <Box className="w-full flex-between">
                    <span className="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-mainSlate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors">
                      جلسه رایگان
                    </span>
                    <Box className="flex items-center gap-x-1.5 md:gap-x-2">
                      <span className="text-slate-500 dark:text-gray-500 text-sm md:text-lg">
                        3:22
                      </span>
                      <PlayCircleFilledWhiteOutlined className="w-5 h-6 md:size-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors" />
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion className="w-full !rounded-2xl my-5 bg-gray-100 text-zinc-700 dark:bg-gray-700 dark:text-white before:hidden shadow-none transition-colors">
              <AccordionSummary
                expandIcon={<ExpandMore className="dark:text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#4A4B6D]"
              >
                طراحی html,css داشبورد
              </AccordionSummary>
              <AccordionDetails>
                <Box className="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                  <Link
                    to=""
                    className="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]"
                  >
                    <span className="flex-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-DanaBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors">
                      1
                    </span>
                    <h4 className="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors">
                      معرفی دوره
                    </h4>
                  </Link>
                  <Box className="w-full flex-between">
                    <span className="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-mainSlate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors">
                      {" "}
                      نقدی
                    </span>
                    <Box className="flex items-center gap-x-1.5 md:gap-x-2">
                      <span className="text-slate-500 dark:text-gray-500 text-sm md:text-lg">
                        3:22
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-6 md:size-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Comment */}
          <div className="bg-white dark:bg-gray-800 px-3.5 md:px-5 pt-5 md:pt-7 pb-3.5 md:pb-6 shadow-light dark:shadow-none rounded-2xl mt-4 sm:mt-5">
            {/* Head & Sent Btn */}
            <div className="flex-between flex-wrap mb-5">
              <div className="flex items-center gap-x-3.5">
                <span className="block w-2.5 h-10 bg-pink-500 dark:bg-rose-500 rounded-sm"></span>
                <h3 className="text-zinc-700 dark:text-white font-MorabbaBold text-2xl md:text-3xl">
                  نظرات
                </h3>
              </div>
              <button
                onClick={NewCommentHandler}
                className="button-md button-primary rounded-xl"
              >
                ایجاد نظر جدید
              </button>
            </div>
            <NewCommentForm showNewCommentForm={showNewCommentForm} />
            {/* Comment Items */}
            <CommentItem />
          </div>
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
                    284
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
              <img
                src={User}
                className="block mx-auto mb-2 w-[90px] h-[90px] rounded-full"
                alt="ghorbani-dev.ir"
              />
                <h4 className="text-zinc-700 dark:text-white text-2xl mb-1">
                  مهرشاد براتی
                </h4>
                <p className="text-slate-500 dark:text-gray-500 text-sm mt-1.5">
                  برنامه نویس و توسعه دهنده فول استک وب
                </p>
            <Link
              to="#"
              className="flex-center my-3 gap-x-1.5 text-slate-500 dark:text-gray-500 text-sm"
            >
               مدرس دوره
              <Logout className="size-5" />
            </Link>
            <p className="text-zinc-700 dark:text-white font-danaLight mt-2.5">
            اولین کدم رو 14 سالگی زدم، حدود 9 سال پیش که با زبان ویژوال بیسیک بود و بعد حدودا 2 سال تو فیلد برنامه نویسی موبایل با زبان جاوا کار کردم و در نهایت با عشقی به اسم جاوا اسکریپت آشنا شدم و حدودا یه 7 سالی هست جاوا اسکریپت کد می‌زنم و به صورت Mern Stack فعالیت می‌کنم.
            </p>
          </div>
          {/* Short Link */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 px-5 py-6 shadow-light dark:shadow-none rounded-2xl">
              <span className="flex items-center gap-x-2.5 text-zinc-700 mb-2 -mr-5 dark:text-white font-DanaBold text-2xl"></span>
              <div onClick={CopyInClipboardHandler} className="flex-between cursor-pointer gap-x-2.5 px-4 h-[65px] text-slate-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-gray-800 border border-dashed border-gray-600/30 rounded-xl transition-colors">
                <ContentCopyOutlined className="size-6"/>
                <span ref={CourseShortLink} className="text-xl truncate dir-ltr">https://sabzlearn.ir/?p=2862</span>           
              </div>
          </div>
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
