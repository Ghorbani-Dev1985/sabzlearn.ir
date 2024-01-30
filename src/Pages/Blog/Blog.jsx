import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import {
  CalendarMonthOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import ShowHtmlTemplate from "../../Components/ShowHtmlTemplate/ShowHtmlTemplate";
import Comment from "../../Components/Comment/Comment";
import toast from "react-hot-toast";
import ShortLink from "../../Components/ShortLink/ShortLink";
import { Link } from "react-router-dom";
import BlogCategory from "../../Components/BlogCategory/BlogCategory";


const newBlogs = [
  {
    id: 1,
    to: "",
    title: "جاواآموزش Class در جاوا اسکریپت",
  },
  {
    id: 2,
    to: "",
    title: "پروژه ساخت پسورد رندوم در پایتون ",
  },
  {
    id: 3,
    to: "",
    title: "  تفاوت تایپ اسکریپت و جاوا اسکریپت",
  },
  {
    id: 4,
    to: "",
    title: " بازی های ساخته شده با پایتون",
  },
  {
    id: 5,
    to: "",
    title: " بک اند چیست؟",
  }
];

function Blog() {
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const NewCommentHandler = () => {
    let isLogin = false;
    if (isLogin) {
      setShowNewCommentForm((prev) => !prev);
    } else {
      toast.error("لطفا ابتدا در سایت وارد شوید");
    }
  };
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        linkOneTo="/blogs"
        linkOneTitle="وبلاگ"
        linkThreeTitle="ساخت تایمر با جاوا اسکریپت"
      />
      {/* Main */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-5 mt-7">
        {/* Content */}
        <section className="col-span-1 lg:col-span-2 space-y-5">
          <div className="p-5 dark:border border-gray-700 shadow-light dark:shadow-none bg-white dark:bg-gray-800 rounded-2xl">
            {/* Title */}
            <div className="pb-6 mb-5 border-b border-b-gray-200 dark:border-b-gray-700">
              <h1 className="text-zinc-700 dark:text-white font-MorabbaBold text-2xl/9 lg:text-4xl/[48px]">
                ساخت تایمر با جاوا اسکریپت
              </h1>
            </div>
            {/* Author & Date */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="text-xs font-DanaMd text-zinc-700 dark:text-white">
                <PersonOutlineOutlined className="size-6 ml-0.5" />
                <span>نوشته از کامل بهرامی</span>
              </div>
              <div className="text-xs font-DanaMd text-zinc-700 dark:text-white">
                <CalendarMonthOutlined className="size-6 ml-0.5" />
                <span>1402/10/04</span>
              </div>
            </div>
            {/* Html Template */}
            <ShowHtmlTemplate
              showMoreDesc={showMoreDesc}
              setShowMoreDesc={setShowMoreDesc}
            >
              <p>
                جاوا اسکریپت به عنوان یکی از کاربردی‌ترین زبان‌های برنامه‌نویسی
                روز دنیا، قابلیت‌های فراوانی را از خود نشان داده است و هم‌اکنون
                در سطح دنیا میلیون‌ها توسعه‌دهنده از این زبان برنامه‌نویسی
                استفاده می‌کنند. یکی از قابلیت‌های جذاب و کاربردی جاوا اسکریپت،
                ساخت عناصر تعاملی و کاربرپسند است که تایمر یا ساعت‌های شمارش
                معکوس یکی از این عناصر تعاملی جذاب هستند. ساخت تایمر با جاوا
                اسکریپت در عین سادگی بسیار کاربردی است و بسیاری از وبسایت‌ها
                برای اهداف مارکتینگ خود از آن استفاده می‌کنند. برای افزایش فروش
                آنلاین و تعامل با مشتریان، استفاده از نوعی تایمر شمارش معکوس در
                استراتژی بازاریابی دیجیتالی می‌تواند ابزار بسیار مؤثری باشد. طبق
                اصول روانشناختی بازاریابی دیجیتال، تایمر شمارش معکوس کاربران را
                وادار می‌کند تا اقدامات فوری انجام دهند. در این راهنمای جامع از
                مجله سبزلرن به ساخت تایمر با جاوا اسکریپت از نوع معمولی و شمارش
                معکوس خواهیم پرداخت و قدم‌به‌قدم مراحل کار را تشریح خواهیم کرد.
                پس اگر دوست دارید اصول توسعه و ساخت Timer با جاوا اسکریپت را یاد
                بگیرید و بتوانید بر زمان بندی رخدادها در جاوا اسکریپت، تسلط پیدا
                کنید، تا پایان این مطلب با ما همراه باشید.
              </p>
              <p>
                تایمر شمارش معکوس به عنوان نوعی ابزار همه‌کاره و تأثیرگذار برای
                وب‌سایت ما عمل می‌کند و اساساً کاربردهای زیر را ارائه می‌دهد:
                ایجاد فوریت از تایمر شمارش معکوس برای القای حس فوریت استفاده
                می‌شود. تایمر به‌ویژه برای پیشنهادات با زمان محدود مؤثر است و
                باعث تصمیم‌گیری سریع می‌شود. شمارش معکوس راه‌اندازی رویداد یا
                محصول از تایمر برای یک رویداد یا معرفی محصول استفاده می‌کنند که
                موجب ایجاد انگیزه و هیجان در کاربران می‌شود. یادآوری انقضای
                پیشنهاد تایمر به بازدیدکنندگان نوعی نشانه واضح و بصری از زمان
                باقیمانده تا زمان انقضای پیشنهاد یا رویدادی خاص ارائه می‌دهد که
                باعث افزایش آگاهی از فرصت‌های حساس به زمان می‌شود. در همه این
                سناریوها، تایمر شمارش معکوس به عنوان نوعی کاتالیزور برای تعامل
                بازدیدکنندگان عمل می‌کند و اقدامات سریع را تشویق خواهد که در
                نهایت به افزایش تبدیل و فروش کمک می‌کند. در ادامه آموزش ساخت
                تایمر با جاوا اسکریپت ارائه شده است.
              </p>
              <p>
                تایمرهای متنوع و جذابی را می‌توان با استفاده از جاوا اسکریپت
                ساخت. از مهم‌ترین پیش‌نیازهای ساخت Timer با جاوا اسکریپت می‌توان
                به مواردی همچون درک پایه از زبان نشانه گذاری HTML و استایل دهی
                با CSS و همچنین درک نسبتاً متوسط به بالایی از زبان برنامه نویسی
                جاوا اسکریپت اشاره کرد. در ادامه با پیاده‌سازی نوعی تایمر شمارش
                معکوس در جاوا اسکریپت کار ساخت این نوع تایمرها را شروع خواهیم
                کرد. تنظیم ساختار HTML کار ساخت تایمر جاوا اسکریپتی ما با ایجاد
                نوعی سند HTML برای تعریف ساختار تایمر شروع خواهد شد که این
                ساختار حاوی یک عنصر div ساده است. قطعه کد زیر ساختار HTML تایمر
                مد نظر ما را نشان می‌دهد:
              </p>
              <p>
                قطعه کد فوق حاوی چندین عنصر span مختلف اعم از روز، ساعت، دقیقه و
                ثانیه برای تعریف ساختار مد نظر است. ایجاد تایمر شمارش معکوس جاوا
                اسکریپت حال در این مرحله باید کدهای جاوا اسکریپت برای ساخت تایمر
                را ارائه کنیم که قطعه کد اصلی انجام این کار به صورت زیر است:
              </p>
              <p>
                کد داده شده نوعی تابع جاوا اسکریپت، countdown(dateEnd) را تعریف
                می‌کند که یک تایمر شمارش معکوس را آغاز خواهد کرد و تاریخ ورودی
                را به مهر زمانی تبدیل می‌کند. همچنین در کد فوق نوعی تایمر تنظیم
                شده است تا تابع calculate را در هر ثانیه فراخوانی کند و زمان
                باقی‌مانده بین تاریخ فعلی و تاریخ پایان مشخص شده را محاسبه
                می‌کند. سپس تابع calculate زمان باقیمانده را به‌ روز، ساعت،
                دقیقه و ثانیه تقسیم کرده و عناصر HTML را بر این اساس به‌روزرسانی
                می‌کند. شمارش معکوس تا زمانی که تایمر به صفر برسد یا منفی شود
                ادامه می‌یابد. در کد فوق از ساخت تایمر با جاوا اسکریپت برای
                اجرای شمارش معکوس، به‌سادگی تابع countdown با تاریخ پایان ارائه
                شده به عنوان پارامتر فراخوانی می‌شود. تاریخ پایان باید چیزی به
                صورت زیر باشد:
              </p>
            </ShowHtmlTemplate>
          </div>
           {/* Comment */}
         <Comment showNewCommentForm={showNewCommentForm} NewCommentHandler={NewCommentHandler} />
        </section>
        {/* Sidebar */}
        <aside className="hidden lg:block col-span-1 w-[300px] xl:w-96  space-y-5">
           {/* Short Link */}
           <ShortLink bgColor="bg-yellow-400" link="https://sabzlearn.ir/?p=3237" />
           {/* New Blogs */}
           <div className="hidden lg:block dark:border border-gray-700 shadow-light dark:shadow-none bg-white dark:bg-gray-800 rounded-2xl py-6 px-6 xl:px-10">
           <span className="flex items-center gap-x-2.5 mb-5 -mr-6 xl:-mr-10 text-zinc-700 dark:text-white font-danaDemiBold text-2xl">
                        <span className="block w-7 h-2 bg-pink-500 dark:bg-rose-500 rounded-l-sm -mr-px"></span>
                        جدیدترین نوشته ها
                    </span>
                    <div className="flex flex-col font-danaLight text-xl text-zinc-700 dark:text-white last:child:pb-0 last:child:border-b-0 child:py-3 child:border-b child:border-dashed child:border-b-slate-500 dark:child:border-b-gray-500">
                        {
                          newBlogs.map(({id , to , title}) => {
                            return(
                              <React.Fragment key={id}>
                              <Link to={to}>{title}</Link>
                              </React.Fragment>
                            )
                          })
                        }
                    </div>
           </div>
           {/* Category */}
           <BlogCategory />
        </aside>
      </section>
    </>
  );
}

export default Blog;
