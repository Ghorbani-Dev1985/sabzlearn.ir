import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import ArticleCard from '../ArticleCard/ArticleCard'

const LastArticles = [
{
  id: 1,
  to: "",
  src: "./src/assets/Images/ArticlesImg/what-is-backend-1-768x512.webp",
  title: "بک اند چیست؟",
  description: "بک اند چیست؟ این سوالی است که ممکن است به ذهن اکثر افراد بیاید؛ بک اند یک شغل در زمینه برنامه نویسی است که در این مقاله قصد داریم پس",
  authorLink: "",
  authorName: "ارمیا مزرعه",
  date: "1402/11/05"
},
{
  id: 2,
  to: "",
  src: "./src/assets/Images/ArticlesImg/The-difference-between-TypeScript-and-JavaScript-1-768x512.webp",
  title: " تفاوت تایپ اسکریپت و جاوا اسکریپت",
  description: "طبق مطالعات انجام شده، تایپ اسکریپت دومین زبان محبوب در میان توسعه‌دهندگان است و جاوا اسکریپت در رقابتی پیاپی با این زبان برنامه‌نویسی در رتبه سوم قرار دارد. این محبوبیت",
  authorLink: "",
  authorName: " کامل بهرامی",
  date: "1402/11/04"
},
{
  id: 3,
  to: "",
  src: "./src/assets/Images/ArticlesImg/games-made-with-python-1-768x512.webp",
  title: " بازی های ساخته شده با پایتون",
  description: "ساخت بازی با پایتون یکی دیگر از مباحثی است که این روزها سروصدای زیادی کرده؛ در واقع بازی های ساخته شده با پایتون آنقدر هم که فکر می‌کنید انگشت شمار",
  authorLink: "",
  authorName: " ارمیا مزرعه ",
  date: "1402/11/04"
},
{
  id: 4,
  to: "",
  src: "./src/assets/Images/ArticlesImg/api-in-javascript-1-768x512.webp",
  title: " آموزش کار با API در جاوا اسکریپت",
  description: "توانایی برقراری تماس‌های API در جاوا اسکریپت مهارتی اساسی برای توسعه‌دهندگان وب در دنیای برنامه نویسی است که به آن‌ها اجازه می‌دهد داده‌ها را از منابع خارجی بازیابی کرده و",
  authorLink: "",
  authorName: " کامل بهرامی ",
  date: "1402/11/02"
},
]

function LastArticle() {
  return (
    // LastArticle Component
    <section className='mt-25 relative'>
       <SectionTitle squareColor="bg-pink-500 dark:bg-rose-500" title=" جدیدترین دوره ها" subTitle=" یادگیری و رشد توسعه فردی " isLink={true} to="" linkText="مشاهده همه مقالات"/>      
       {/* LastArticle */}
     <div className='grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
         {
      
         LastArticles.map(({id, src , title , description , authorLink , authorName , date}) => {
           return(
             <React.Fragment key={id}>
                          
                        <ArticleCard src={src} title={title} description={description} authorLink={authorLink} authorName={authorName} date={date} />
                    </React.Fragment>
                )
              })
        }
</div>
<div className="dark:hidden hidden md:block w-[500px] h-[500px] lg:w-[630px] lg:h-[630px] bg-pink-500 opacity-20 blur-2xl rounded-full -z-10 absolute -right-[320px] lg:-right-[400px] top-0"></div> 
    </section>
  )
}

export default LastArticle


